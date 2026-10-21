import {isPrimarySource} from './source-policy';
import fs from 'node:fs';
import {parse} from 'yaml';
import {files,result} from './lib';
type RecordEntry={number:number;title:string;topic:string;topicId:string;keyword:string;url:string;source:string;export:string;characters:number;batch:number};
const manifest:RecordEntry[]=JSON.parse(fs.readFileSync('docs/articles-200-manifest.json','utf8'));
const issues:string[]=[];const titles=new Set<string>();const bodies=new Set<string>();const records:{row:RecordEntry;body:string;shingles:Set<string>}[]=[];
if(manifest.length!==200)issues.push('Expected 200 manifest entries');
const sourceFiles=files('src/content/articles').filter(f=>/practical-.*\.md$/.test(f));if(sourceFiles.length!==200)issues.push('Expected 200 new Markdown files');
for(const row of manifest){
 const text=fs.readFileSync(row.source,'utf8').replaceAll('\r\n','\n');const boundary=text.indexOf('\n---',4);const data=parse(text.slice(4,boundary));const body=text.slice(boundary+4).trim();
 if(titles.has(data.title))issues.push('Duplicate title '+row.source);titles.add(data.title);
 if(bodies.has(body))issues.push('Duplicate body '+row.source);bodies.add(body);
 if(data.title!==row.title||data.topic!==row.topicId||data.category!=='blog'||data.draft)issues.push('Manifest mismatch '+row.source);
 if(!/\d{4}-\d{2}-\d{2}/.test(data.date)||data.date>'2026-10-21'||data.updated<data.date)issues.push('Invalid editorial dates '+row.source);
 if((body.match(/[\u3400-\u9fff]/g)||[]).length<500)issues.push('Insufficient Chinese body '+row.source);
 if((body.match(/^## /gm)||[]).length<6||!body.includes('常见问题')||!body.includes('进一步阅读与参考'))issues.push('Incomplete article structure '+row.source);
 if(/^# /m.test(body))issues.push('Extra H1 '+row.source);
 for(const source of data.sources){if(!isPrimarySource(source.url))issues.push('Unexpected source '+source.url);}
 if(/实测.{0,8}\d+\s*(Mbps|Gbps)|解锁率.{0,8}\d+%|用户好评.{0,8}\d+%|保证.*首页/.test(body))issues.push('Unsupported quantified claim '+row.source);
 for(const id of data.related)if(!fs.existsSync('src/content/articles/'+id+'.md'))issues.push('Missing related article '+id);
 const normalized=body.replace(/\[[^\]]+\]\([^)]+\)/g,'').replace(/https?:\/\/\S+/g,'').replace(/[^\u3400-\u9fffa-z0-9]/gi,'').toLowerCase();
 const shingles=new Set<string>();for(let i=0;i<normalized.length-4;i++)shingles.add(normalized.slice(i,i+5));records.push({row,body,shingles});
}
let maxSimilarity=0;let closest:string[]=[];const flagged:{a:string;b:string;similarity:number}[]=[];
for(let i=0;i<records.length;i++)for(let j=i+1;j<records.length;j++){
 const a=records[i],b=records[j];let overlap=0;for(const s of a.shingles)if(b.shingles.has(s))overlap++;const score=overlap/(a.shingles.size+b.shingles.size-overlap);
 if(score>maxSimilarity){maxSimilarity=score;closest=[a.row.title,b.row.title];}
 if(score>.75)flagged.push({a:a.row.title,b:b.row.title,similarity:Number(score.toFixed(3))});
}
if(flagged.length)issues.push(flagged.length+' article pairs exceed 0.75 text-shingle similarity');
const counts=Object.fromEntries([...new Set(manifest.map(r=>r.topic))].map(t=>[t,manifest.filter(r=>r.topic===t).length]));for(const [topic,count] of Object.entries(counts))if(count!==20)issues.push(topic+' expected 20');
result('articles-200',issues,{newArticles:manifest.length,totalMarkdown:files('src/content/articles').filter(f=>f.endsWith('.md')).length,topics:counts,minChineseCharacters:Math.min(...records.map(r=>(r.body.match(/[\u3400-\u9fff]/g)||[]).length)),maxChineseCharacters:Math.max(...records.map(r=>(r.body.match(/[\u3400-\u9fff]/g)||[]).length)),pairsCompared:records.length*(records.length-1)/2,maxFiveCharacterShingleJaccard:Number(maxSimilarity.toFixed(3)),closestPair:closest,flaggedPairs:flagged,limits:'Shared article layout, context and checklist wording are intentional. Similarity checks detect near duplicates; they do not prove factual completeness or editorial quality.'});
