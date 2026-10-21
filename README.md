# 机场翻 · jichangfan.shop

完整 Astro 静态中文博客。网站源码、内容、构建产物、SEO 配置、IndexNow、自动验收和部署说明均在本目录。

## 先看这里

- [29 品牌、58 档套餐与优惠码维护](docs/partner-brands.md)
- [品牌套餐汇总表](docs/partner-plans.csv)

- [新增 200 篇博客与审读说明](docs/articles-200-publishing.md)
- [200 篇目录与关键词分配](docs/articles-200-manifest.csv)

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

已加入站长提供的29个品牌与推广链接、58档人民币套餐参考及12个优惠码，并保留5个原有品牌。新增价格和流量来自第三方参考站，标为 reference-data，未在服务商结账页核验；原有5个品牌为官方资料。没有购买测速、解锁或稳定性记录。推广入口旁披露可能获得佣金。美元月付榜仅比较官方核实的同币种月付，参考价格不参与该榜。

所有 8 个主攻关键词自然分配到对应搜索意图；新增 200 篇围绕具体长尾问题，博客合计 205 篇，教程与百科另有 10 篇。目录提供 10 个专题和每页 20 篇的分页。不承诺 Bing 首页。本站没有后台、付款、注册或站内统计脚本；推广链接带有站长提供的邀请参数，不需要服务端密钥即可展示。
