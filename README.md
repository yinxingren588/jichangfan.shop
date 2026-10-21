# 机场翻 · jichangfan.shop

完整 Astro 静态中文博客。网站源码、内容、构建产物、SEO 配置、IndexNow、自动验收和部署说明均在本目录。

## 先看这里

- [最终验收](docs/final-audit.md)
- [Cloudflare 上线指南](docs/deployment.md)
- [Bing 站长平台与收录](docs/bing-webmaster.md)
- [IndexNow 命令](docs/indexnow.md)
- [内容维护](docs/content-maintenance.md)
- [全部关键词映射](docs/keyword-map.csv)
- [公开资料来源](docs/sources.md)

## 本地使用

需要 Node.js 24 LTS（本次 Node 24.18.0）。在此目录运行：

```text
npm ci
npm run dev
npm run check
npm run build
npm test
npm run preview
```

部署目录：`dist`，构建命令：`npm run build`。`dist/index.html` 可查阅 HTML，但正常交互和绝对路径需要本地 HTTP 服务，建议用 preview。

## 事实边界

5 个真实品牌：1 个代理订阅、4 个商业 VPN，类型明确区分。没有虚构机场、实测速率或客户评价。2 个真实排序视图（资料完备度、美元月付），另有性价比核算与稳定观察页面；没有证据时不凑满 3 个性能榜。当前没有品牌联盟链接。

所有 8 个主攻关键词自然分配到对应搜索意图；不承诺 Bing 首页。本站没有后台、付款、注册和追踪，不需要服务端密钥即可展示。
