import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {pages,result} from './lib';import {airports} from '../src/data/airports';
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
 checks.push('All '+all.length+' normal pages respond 200 without document overflow at 1440, 768 and 375 px');
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/');
 await page.screenshot({path:'docs/audit/home-desktop.png',fullPage:true});await page.screenshot({path:'docs/audit/home-first-screen.png',fullPage:false});
 for(const route of ['/','/compare/','/airport/just-my-socks/','/review/proton-vpn/','/airport/feimaoyun/','/coupons/','/guides/windows/','/guides/','/guides/wireguard-android/','/recommend/budget/','/ranking/value/','/blog/topics/traffic/','/glossary/node/','/blog/','/blog/topics/windows/','/blog/practical-windows-sleep-reconnect/']){
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
 await page.goto(base+'/compare/?brands=feimaoyun,edgenova,feiv');assert.match(await page.locator('#compare-table').innerText(),/¥86 \/ 年付总额/);assert.match(await page.locator('#compare-table').innerText(),/200 GB \/ 总配额/);assert.match(await page.locator('#compare-table').innerText(),/年付折合每月/);assert.equal(await page.locator('#compare-table a[rel~=sponsored]').count(),3);checks.push('Partner comparison: annual totals, monthly equivalent, total quota and exact affiliate links');
 await context.grantPermissions(['clipboard-read','clipboard-write'],{origin:base});await page.goto(base+'/coupons/');await page.getByRole('button',{name:'复制 隐形人 优惠码',exact:true}).first().click();assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'yxr888');assert.match(await page.locator('.coupon-status').first().innerText(),/已复制/);await page.screenshot({path:'docs/audit/coupons-desktop.png',fullPage:false});checks.push('Coupon copy writes the supplied case-sensitive code to clipboard');
 await page.goto(base+'/coupons/');
 assert.equal(await page.locator('.partner-detail:visible').count(),29);assert.equal(await page.locator('.partner-detail tr[data-plan-period]:visible').count(),58);
 await page.locator('#plan-brand').fill('Breezenet');assert.equal(await page.locator('.partner-detail:visible').count(),1);assert.equal(await page.locator('#breezenet').isVisible(),true);
 await page.getByRole('button',{name:'清除筛选',exact:true}).click();await page.locator('#plan-period').selectOption('year-equivalent');assert.equal(await page.locator('.partner-detail:visible').count(),3);for(const row of await page.locator('.partner-detail tr[data-plan-period]:visible').all())assert.equal(await row.getAttribute('data-plan-period'),'year-equivalent');
 await page.locator('#plan-period').selectOption('all');await page.locator('#plan-has-coupon').check();assert.equal(await page.locator('.partner-detail:visible').count(),12);
 await page.locator('#plan-brand').fill('no-such-brand');assert.equal(await page.locator('#plan-filter-empty').isVisible(),true);assert.equal(await page.locator('.partner-detail:visible').count(),0);
 await page.locator('.coupon-directory a[href="#yinxingren"]').click();assert.equal(await page.locator('#yinxingren').isVisible(),true);assert.equal(await page.locator('.partner-detail:visible').count(),29);
 await page.goto(base+'/coupons/#plan-library');await page.locator('#plan-brand').fill('飞V');await page.locator('#plan-period').selectOption('one-time');assert.equal(await page.locator('#feiv').isVisible(),true);for(const row of await page.locator('.partner-detail tr[data-plan-period]:visible').all())assert.equal(await row.getAttribute('data-plan-period'),'one-time');
 await page.locator('#plan-filters').screenshot({path:'docs/audit/plan-filters-desktop.png'});checks.push('Plan filters: 29 brands/58 plans, bilingual name, annual equivalent, 12 supplied coupon codes, no result, deep-link reset and one-time quota');
 await page.goto(base+'/blog/topics/traffic/');assert.equal(await page.locator('.topic-reader tbody tr').count(),4);assert.equal(await page.locator('.reading-route a').count(),3);await page.screenshot({path:'docs/audit/topic-traffic-desktop.png',fullPage:false});
 await page.goto(base+'/blog/practical-windows-sleep-reconnect/');assert.equal(await page.locator('.breadcrumb a[href="/blog/topics/windows/"]').count(),1);assert.equal(await page.locator('.article-paths a').count(),3);assert.equal(await page.locator('.article-paths a[href="/guides/windows/"]').count(),1);checks.push('Topic introductions, three-step reading routes, grouped breadcrumbs and contextual article destinations');
 await page.goto(base+'/blog/');await page.screenshot({path:'docs/audit/blog-desktop.png',fullPage:false});await page.goto(base+'/blog/practical-windows-sleep-reconnect/');await page.screenshot({path:'docs/audit/article-desktop.png',fullPage:false});
 await page.goto(base+'/airport/');await page.getByRole('button',{name:'代理订阅',exact:true}).click();assert.equal(await page.locator('[data-brand-kind]:visible').count(),airports.filter(a=>a.kind==='proxy').length);await page.getByRole('button',{name:'商业 VPN',exact:true}).click();assert.equal(await page.locator('[data-brand-kind]:visible').count(),4);checks.push('Brand filtering: all supplied proxies and 4 VPNs');
 await page.goto(base+'/guides/');assert.equal(await page.locator('.guide-section').count(),6);assert.equal(await page.locator('.guide-section .article-row').count(),30);for(const section of await page.locator('.guide-section').all())assert.equal(await section.locator('.article-row').count(),5);await page.screenshot({path:'docs/audit/guides-desktop.png',fullPage:false});await page.getByRole('link',{name:'Android 使用 WireGuard：从配置文件导入到断开检查',exact:true}).click();assert.match(await page.locator('h1').innerText(),/Android 使用 WireGuard/);await page.screenshot({path:'docs/audit/guide-android-desktop.png',fullPage:false});checks.push('Guides: 30 articles in six five-entry groups, working article navigation');
 await page.goto(base+'/search/');const searchTotal=await page.locator('[data-search]').count();await page.locator('#query').fill('Windows VPN 与机场客户端');assert.equal(await page.locator('[data-search]:visible').count(),1);await page.locator('#query').fill('zzzz-no-match');assert.equal(await page.locator('#no-results').isVisible(),true);await page.locator('#query').fill('');assert.equal(await page.locator('[data-search]:visible').count(),searchTotal);checks.push('Search: matching result, no result, clear '+searchTotal+' entries');
 await page.goto(base+'/blog/');assert.equal(await page.locator('.article-list .article-row').count(),20);await page.getByRole('link',{name:'第 11 页',exact:true}).click();assert.equal(await page.locator('.article-list .article-row').count(),5);assert.match(await page.locator('meta[name=robots]').getAttribute('content')||'',/noindex/);await page.goto(base+'/blog/topics/windows/');assert.equal(await page.locator('.article-list .article-row').count(),20);await page.getByRole('link',{name:'Windows 睡眠唤醒后 VPN 不恢复，先查什么？',exact:true}).click();assert.match(await page.locator('h1').innerText(),/Windows 睡眠唤醒/);checks.push('Blog: 20 entries per page, 5 on final page, noindex archive, 20-entry topic, article navigation');
 await page.setViewportSize({width:375,height:900});await page.goto(base+'/');const menu=page.locator('.menu-button');assert.equal(await page.locator('#primary-nav').isVisible(),false);await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');await page.getByRole('navigation',{name:'主导航'}).getByRole('link',{name:'机场推荐',exact:true}).click();assert.match(page.url(),/recommend/);checks.push('Mobile menu: open, ARIA state, navigate');
 await page.goto(base+'/');await page.screenshot({path:'docs/audit/home-mobile.png',fullPage:true});
 await page.goto(base+'/guides/');await page.screenshot({path:'docs/audit/guides-mobile.png',fullPage:false});const unknown=await page.goto(base+'/a-page-that-does-not-exist/');assert.equal(unknown?.status(),404);assert.equal(await page.locator('h1').innerText(),'这条路径，暂时没有内容。');checks.push('Missing path returns actual 404 page');
 const nojs=await browser.newContext({javaScriptEnabled:false});const staticPage=await nojs.newPage();await staticPage.goto(base+'/compare/');assert.equal(await staticPage.locator('.compare-table thead th').count(),airports.length+1);await staticPage.goto(base+'/coupons/');assert.equal(await staticPage.locator('.partner-detail').count(),29);assert.equal(await staticPage.locator('.partner-detail tr[data-plan-period]').count(),58);await staticPage.goto(base+'/');assert.equal(await staticPage.locator('.card').count(),3);checks.push('No JavaScript: homepage, full comparison and all 29 brands/58 reference plans remain readable');await nojs.close();
}catch(error){issues.push(String(error));}finally{await browser.close();}
fs.writeFileSync('docs/audit/accessibility.json',JSON.stringify(accessibility,null,2));
result('browser',issues,{visits,checks});
