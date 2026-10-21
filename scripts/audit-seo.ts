import fs from 'node:fs';import {load} from 'cheerio';import {pages,result} from './lib';import {site} from '../src/data/site';
const issues:string[]=[];const titles=new Set<string>();const descriptions=new Set<string>();const all=pages();
const sm=load(fs.readFileSync('dist/sitemap-0.xml','utf8'),{xmlMode:true});const urls=sm('loc').map((_,el)=>sm(el).text()).get();
if(urls.length!==new Set(urls).size)issues.push('Duplicate sitemap URL');
for(const p of all){const $=p.$;const title=$('title').text();const desc=$('meta[name=description]').attr('content');if(!title)issues.push(p.url+' missing title');if(titles.has(title))issues.push(p.url+' duplicate title');titles.add(title);if(!desc)issues.push(p.url+' missing description');else{if(descriptions.has(desc))issues.push(p.url+' duplicate description');descriptions.add(desc);}
if($('h1').length!==1)issues.push(p.url+' H1 count '+$('h1').length);
if($('link[rel=canonical]').length!==1||$('link[rel=canonical]').attr('href')!==site.url+p.url)issues.push(p.url+' wrong canonical');
const robots=$('meta[name=robots]').attr('content')||'';if(!/^(index|noindex), follow/.test(robots))issues.push(p.url+' wrong robots');
const indexed=!robots.includes('noindex');if(indexed!==urls.includes(site.url+p.url))issues.push(p.url+' sitemap inclusion mismatch');
if(/localhost|127\.0\.0\.1/i.test($('link[rel=canonical]').attr('href')||'')||/(?:localhost|127\.0\.0\.1):4321|\{\{[^}]+\}\}|TODO|Lorem ipsum/i.test($('main').text()))issues.push(p.url+' leftover variable or test URL');
if($('main').text().trim().length<50)issues.push(p.url+' blank page');
for(const prop of ['og:title','og:description','og:url','og:image'])if(!$('meta[property="'+prop+'"]').attr('content'))issues.push(p.url+' missing '+prop);
if(!$('meta[name="twitter:card"]').length)issues.push(p.url+' missing Twitter card');
try{const data=JSON.parse($('script[type="application/ld+json"]').first().text());if(!Array.isArray(data)||!data.some(s=>s['@type']==='WebSite')||!data.some(s=>s['@type']==='Organization'))throw Error('missing root schema');for(const s of data){if(s['@context']!=='https://schema.org')throw Error('schema context');if(s['@type']==='BreadcrumbList'){let expected=1;for(const item of s.itemListElement){if(item.position!==expected++||!item.item.startsWith(site.url+'/'))throw Error('breadcrumb');}}if(['Article','BlogPosting'].includes(s['@type'])){if(s.mainEntityOfPage!==site.url+p.url||s.dateModified>site.date||s.datePublished>s.dateModified)throw Error('article date or URL');}if(s['@type']==='ItemList')for(const item of s.itemListElement)if(!$('a').toArray().some(a=>new URL($(a).attr('href')||'/',site.url).href===item.url))throw Error('ItemList invisible URL');}}catch(error){issues.push(p.url+' invalid schema: '+String(error));}
}
for(const url of urls)if(!all.some(p=>site.url+p.url===url))issues.push('Sitemap missing output '+url);
if(!fs.readFileSync('dist/robots.txt','utf8').includes('Sitemap: '+site.url+'/sitemap-index.xml'))issues.push('robots sitemap missing');
const index=load(fs.readFileSync('dist/sitemap-index.xml','utf8'),{xmlMode:true});if(index('loc').text()!==site.url+'/sitemap-0.xml')issues.push('wrong sitemap index');
sm('url').each((_,el)=>{const date=sm(el).find('lastmod').text();if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||date>site.date)issues.push('invalid lastmod');});
result('seo',issues,{pages:all.length,indexable:urls.length,checks:['unique titles/descriptions','one H1','canonical','robots','OG/Twitter','sitemap XML and lastmod','schema JSON, article dates and visible ItemList links','placeholder and blank-page scan']});
