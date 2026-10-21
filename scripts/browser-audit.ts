import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {pages,result} from './lib';
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4321';
const executablePath=process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser=await chromium.launch({executablePath,headless:true});
const issues:string[]=[];const checks:string[]=[];const accessibility:Record<string,unknown>[]=[];let visits=0;
fs.mkdirSync('docs/audit',{recursive:true});
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 const page=await context.newPage();
 page.on('pageerror',error=>issues.push('JavaScript error: '+error.message));
 const all=pages().filter(p=>p.url!=='/404/');
 for(const width of [1440,768,375]){
  await page.setViewportSize({width,height:1000});
  for(const p of all){const response=await page.goto(base+p.url);if(response?.status()!==200)issues.push(p.url+' HTTP '+response?.status());visits++;if(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1))issues.push(p.url+' horizontal overflow at '+width);}
 }
 checks.push('All 50 normal pages respond 200 without document overflow at 1440, 768 and 375 px');
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/');
 await page.screenshot({path:'docs/audit/home-desktop.png',fullPage:true});
 for(const route of ['/','/compare/','/airport/just-my-socks/','/review/proton-vpn/','/guides/windows/','/recommend/budget/']){
  await page.goto(base+route);const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();accessibility.push({route,violations:audit.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>n.target)}))});for(const v of audit.violations)issues.push(route+' accessibility '+v.id+' ('+v.impact+')');
 }
 await page.goto(base+'/compare/');assert.equal(await page.locator('#compare-empty').isVisible(),true);
 for(const slug of ['just-my-socks','mullvad','ivpn','proton-vpn'])await page.locator('input[value="'+slug+'"]').check();
 assert.equal(await page.locator('#compare-table thead th').count(),5);
 await page.locator('input[value="windscribe"]').click();assert.equal(await page.locator('input[value="windscribe"]').isChecked(),false);
 assert.match(await page.locator('#compare-status').innerText(),/最多/);
 await page.getByRole('button',{name:'移除 Mullvad VPN',exact:true}).click();assert.equal(await page.locator('input[value=mullvad]').isChecked(),false);assert.equal(await page.locator('#compare-table thead th').count(),4);
 await page.goto(base+'/compare/?brands=windscribe,ivpn,invalid,ivpn');assert.equal(await page.locator('#compare-table thead th').count(),3);
 assert.match(await page.locator('#compare-table').innerText(),/Windscribe/);assert.match(await page.locator('#compare-table').innerText(),/尚未核实/);
 await page.screenshot({path:'docs/audit/compare-desktop.png',fullPage:true});checks.push('Comparison: empty, add 2–4, reject fifth, remove, URL restore, invalid/duplicate IDs');
 await page.goto(base+'/airport/');await page.getByRole('button',{name:'代理订阅',exact:true}).click();assert.equal(await page.locator('[data-brand-kind]:visible').count(),1);await page.getByRole('button',{name:'商业 VPN',exact:true}).click();assert.equal(await page.locator('[data-brand-kind]:visible').count(),4);checks.push('Brand filtering: proxy=1, VPN=4');
 await page.goto(base+'/search/');await page.locator('#query').fill('Windows');assert.equal(await page.locator('[data-search]:visible').count(),1);await page.locator('#query').fill('zzzz-no-match');assert.equal(await page.locator('#no-results').isVisible(),true);await page.locator('#query').fill('');assert.equal(await page.locator('[data-search]:visible').count(),20);checks.push('Search: matching result, no result, clear');
 await page.setViewportSize({width:375,height:900});await page.goto(base+'/');const menu=page.locator('.menu-button');assert.equal(await page.locator('#primary-nav').isVisible(),false);await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');await page.getByRole('navigation',{name:'主导航'}).getByRole('link',{name:'机场推荐',exact:true}).click();assert.match(page.url(),/recommend/);checks.push('Mobile menu: open, ARIA state, navigate');
 await page.goto(base+'/');await page.screenshot({path:'docs/audit/home-mobile.png',fullPage:true});
 const unknown=await page.goto(base+'/a-page-that-does-not-exist/');assert.equal(unknown?.status(),404);assert.equal(await page.locator('h1').innerText(),'这条路径，暂时没有内容。');checks.push('Missing path returns actual 404 page');
 const nojs=await browser.newContext({javaScriptEnabled:false});const staticPage=await nojs.newPage();await staticPage.goto(base+'/compare/');assert.equal(await staticPage.locator('.compare-table thead th').count(),6);await staticPage.goto(base+'/');assert.equal(await staticPage.locator('.card').count(),3);checks.push('No JavaScript: homepage cards and complete comparison table are present');await nojs.close();
}catch(error){issues.push(String(error));}finally{await browser.close();}
fs.writeFileSync('docs/audit/accessibility.json',JSON.stringify(accessibility,null,2));
result('browser',issues,{visits,checks});
