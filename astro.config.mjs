import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ site: 'https://jichangfan.shop', output: 'static', trailingSlash: 'always', integrations: [sitemap({filter: (page) => !['/404/','/404.html','/search/'].some(p => new URL(page).pathname === p)})], vite: { plugins: [tailwindcss()] }, devToolbar: {enabled: false} });
