import {defineCollection} from 'astro:content';
import {z} from 'astro/zod';
import {createRequire} from 'node:module';
// Node 24 loads the official loader natively, preserving its CommonJS dependencies on Windows.
const {glob}:typeof import('astro/loaders')=createRequire(import.meta.url)('astro/loaders');
const articles=defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/articles'}),schema:z.object({title:z.string(),description:z.string(),category:z.enum(['guides','blog','glossary']),date:z.string(),updated:z.string(),tags:z.array(z.string()),sources:z.array(z.object({title:z.string(),url:z.url()})),draft:z.boolean().default(false)})});
export const collections={articles};
