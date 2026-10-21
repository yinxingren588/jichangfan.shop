import fs from 'node:fs';import {createHash} from 'node:crypto';import {pages} from './lib';
import {site} from '../src/data/site';
const indexable=pages().filter(p=>!p.$('meta[name=robots]').attr('content')?.includes('noindex'));
const manifest=Object.fromEntries(indexable.map(p=>[site.url+p.url,{hash:createHash('sha256').update(p.html).digest('hex'),lastmod:p.$('meta[name=last-modified]').attr('content')||site.date}]));
fs.writeFileSync('dist/page-manifest.json',JSON.stringify(manifest,null,2));
// Replace integration output with the same URL set plus actual per-page editorial dates.
const esc=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
fs.writeFileSync('dist/sitemap-0.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+Object.entries(manifest).map(([url,v])=>'<url><loc>'+esc(url)+'</loc><lastmod>'+v.lastmod+'</lastmod></url>').join('')+'</urlset>');
fs.writeFileSync('dist/sitemap-index.xml','<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>'+site.url+'/sitemap-0.xml</loc></sitemap></sitemapindex>');
console.log('Generated '+indexable.length+' indexable URLs with editorial lastmod dates.');
