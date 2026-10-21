import {pages,result} from './lib';
import {blogTopics} from '../src/data/blog-topics';
import {primaryDestinations,topicGuides} from '../src/data/reading-paths';
import {site} from '../src/data/site';
const all=pages();const byUrl=new Map(all.map(page=>[page.url,page]));const issues:string[]=[];
const inbound=new Map<string,Set<string>>();const edges=new Map<string,Set<string>>();
for(const page of all){
 const links=new Set<string>();
 page.$('main a[href]').each((_,anchor)=>{const url=new URL(page.$(anchor).attr('href')!,site.url+page.url);if(url.origin===site.url&&byUrl.has(url.pathname)&&url.pathname!==page.url)links.add(url.pathname);});
 edges.set(page.url,links);
 for(const url of links){if(!inbound.has(url))inbound.set(url,new Set());inbound.get(url)!.add(page.url);}
}
const depths=new Map<string,number>([['/',0]]);const queue=['/'];
while(queue.length){const from=queue.shift()!;for(const url of edges.get(from)||[])if(!depths.has(url)){depths.set(url,depths.get(from)!+1);queue.push(url);}}
for(const topic of blogTopics){
 const page=byUrl.get('/blog/topics/'+topic.id+'/');
 if(!page||!topicGuides[topic.id]){issues.push('Missing topic '+topic.id);continue;}
 if(page.$('h1').text()!==topicGuides[topic.id].title)issues.push('Incorrect focused heading '+topic.id);
 if(page.$('.topic-reader tbody tr').length!==4||page.$('.reading-route a').length!==3)issues.push('Incomplete reading path '+topic.id);
 if(page.$('.article-list .article-row').length!==20)issues.push('Topic lost article entries '+topic.id);
}
const articles=all.filter(page=>/^\/(blog|guides|glossary)\/[^/]+\/$/.test(page.url));let topicBreadcrumbs=0;
for(const page of articles){
 const topic=page.$('[data-reading-topic]').attr('data-reading-topic');
 if(!topic||!topicGuides[topic])issues.push('Missing article context '+page.url);
 const links=page.$('.article-paths a');
 if(links.length<2||links.length>3)issues.push('Incorrect context link count '+page.url);
 links.each((_,anchor)=>{const path=new URL(page.$(anchor).attr('href')!,site.url).pathname;if(path===page.url||!byUrl.has(path))issues.push('Invalid contextual destination '+page.url+' -> '+path);});
 if(page.$('.breadcrumb a[href^="/blog/topics/"]').length)topicBreadcrumbs++;
}
if(articles.length!==240||topicBreadcrumbs!==200)issues.push('Incorrect article or grouped breadcrumb coverage');
const destinations=primaryDestinations.map(destination=>{
 const page=byUrl.get(destination.url);const depth=depths.get(destination.url);
 if(!page||page.$('meta[name=robots]').attr('content')?.includes('noindex'))issues.push('Primary destination not indexable '+destination.url);
 if(depth===undefined||depth>3)issues.push('Primary destination too far from homepage '+destination.url);
 return {...destination,homepageClicks:depth,mainContentLinkingPages:inbound.get(destination.url)?.size||0};
});
result('topic-paths',issues,{topicHubs:blogTopics.length,articlesWithContext:articles.length,groupedArticleBreadcrumbs:topicBreadcrumbs,destinations,limits:'Local information architecture checks only; link counts and click depth do not demonstrate search ranking, indexation or user demand.'});
