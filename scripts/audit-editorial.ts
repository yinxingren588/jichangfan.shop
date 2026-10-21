import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {parse} from 'yaml';
import {isPrimarySource} from './source-policy';
import {files,result} from './lib';
type Review={id:string;title:string;category:string;source:string;url:string;changes:string[];beforeSha256:string;afterSha256:string;sources:{title:string;url:string}[];afterHanCharacters:number};
const manifest=JSON.parse(fs.readFileSync('docs/full-editorial-manifest.json','utf8')) as {records:Review[]};
const issues:string[]=[],all=files('src/content/articles').filter(f=>f.endsWith('.md'));
if(all.length!==240||manifest.records.length!==240||new Set(manifest.records.map(r=>r.source)).size!==240)issues.push('Expected exactly 240 unique per-article reviews');
for(const row of manifest.records){const text=fs.readFileSync(row.source,'utf8'),data=parse(text.split('---')[1]),body=text.slice(text.indexOf('\n---',4)+4).trim();
 const actual=createHash('sha256').update(text.replaceAll('\r\n','\n')).digest('hex');
 if(actual!==row.afterSha256||row.beforeSha256===row.afterSha256)issues.push(row.id+' stale hash or unchanged article');
 if(data.title!==row.title||data.category!==row.category||row.url!==`https://jichangfan.shop/${data.category}/${row.id}/`)issues.push(row.id+' changed title/category/URL');
 if(!row.changes.length||row.changes.some(c=>!c.trim()))issues.push(row.id+' missing individual repair notes');
 if(JSON.stringify(data.sources)!==JSON.stringify(row.sources)||(body.match(/[\u3400-\u9fff]/g)||[]).length!==row.afterHanCharacters)issues.push(row.id+' stale source or character record');
 for(const s of row.sources){if(!isPrimarySource(s.url)||!body.includes(s.url))issues.push(row.id+' missing directly linked primary source '+s.url);}
}
result('editorial',issues,{reviewed:manifest.records.length,categories:Object.fromEntries(['blog','guides','glossary'].map(c=>[c,manifest.records.filter(r=>r.category===c).length])),checks:['every original article has a saved substantive edit','individual repair notes','hash and source parity','preserved title, category and URL','primary sources linked in body'],limits:'Confirms review coverage and final-file consistency; does not prove product compatibility, successful configuration on every device, or search ranking.'});
