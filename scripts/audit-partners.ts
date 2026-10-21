import fs from 'node:fs';
import {load} from 'cheerio';
import {airports,partnerAirports,priceLabel,traffic,displayPlan,monthlyPlan,unitCost} from '../src/data/airports';
import supplied from '../src/data/partner-brands.json';
import {result} from './lib';
const issues:string[]=[];
if(partnerAirports.length!==29||supplied.filter(b=>'coupon' in b).length!==12)issues.push('Expected 29 brands and 12 coupons');
const hub=load(fs.readFileSync('dist/coupons/index.html','utf8'));
for(const b of supplied){
 const a=airports.find(a=>a.slug===b.slug);
 if(!a){issues.push('Missing supplied brand '+b.slug);continue;}
 if(a.affiliateUrl!==b.affiliateUrl||a.coupon!==('coupon' in b?b.coupon:undefined))issues.push(b.slug+' supplied link/coupon mismatch');
 if(a.testStatus!=='reference-data'||monthlyPlan(a)||a.plans.length!==2)issues.push(b.slug+' wrong source classification or missing plan');
 if(hub('#'+b.slug).length!==1)issues.push(b.slug+' not reachable in coupon hub');
 for(const route of ['airport','review']){
  const $=load(fs.readFileSync('dist/'+route+'/'+b.slug+'/index.html','utf8'));const main=$('main').text();
  const links=$('main a').filter((_,e)=>$(e).attr('href')===b.affiliateUrl);
  if(!links.length)issues.push(route+'/'+b.slug+' missing exact affiliate URL including fragment');
  links.each((_,el)=>{const rel=$(el).attr('rel')||'';if(!rel.includes('sponsored')||!rel.includes('nofollow'))issues.push(b.slug+' affiliate disclosure rel missing');});
  if(!main.includes('第三方参考')||!main.includes('可能获得佣金'))issues.push(b.slug+' missing provenance/disclosure');
  if(a.coupon&&!main.includes(a.coupon))issues.push(b.slug+' missing coupon');
  if(!a.coupon&&!main.includes('未提供优惠码'))issues.push(b.slug+' invented coupon state');
  for(const p of a.plans){if(!main.includes(priceLabel(p))||!main.includes(traffic(p)))issues.push(route+'/'+b.slug+' missing plan price/traffic');if(p.verified||!p.reference||unitCost(p)!==undefined)issues.push(b.slug+' unverified price treated as verified');}
 }
}
// Regression checks: misleading period labels present in the reference tables must not leak into output.
for(const slug of ['feimaoyun','firefly','kuaili']){
 const a=partnerAirports.find(a=>a.slug===slug)!;
 if(a.plans[0].period!=='year-equivalent'||!priceLabel(a.plans[0]).includes('总额待确认')||displayPlan(a)?.period!=='month')issues.push(slug+' yearly equivalent incorrectly treated as monthly payment');
}
const edge=partnerAirports.find(a=>a.slug==='edgenova')!;
if(priceLabel(displayPlan(edge))!=='¥86 / 年付总额'||traffic(displayPlan(edge))!=='200 GB / 月')issues.push('EdgeNova annual amount/monthly allowance regression');
const once=partnerAirports.find(a=>a.slug==='feiv')!.plans[1];
if(traffic(once)!=='200 GB / 总配额'||priceLabel(once)!=='¥29 / 一次性')issues.push('Feiv one-time traffic regression');
result('partners',issues,{brands:29,plans:58,coupons:12,affiliateLinks:'Exact owner-supplied URLs and case-sensitive coupon codes preserved',provenance:'Third-party reference, not official checkout verification'});
