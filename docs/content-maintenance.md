# 内容维护

品牌统一来源：src/data/airports.ts；不要在卡片、评测和比较页面另写一套价格。核实后修改套餐值、source、lastVerified 和 testStatus。unknown 用空字段，不填 0。tested 需要真实证据并扩展校验标准。

内容：src/content/articles/*.md。Frontmatter 必填独立标题、描述、category、date、updated、tags、sources；draft:true 不进入公开页面和 Sitemap。类别只能 guides/blog/glossary。Markdown 使用二级标题，页面模板统一生成唯一 H1。

新增 200 篇使用 practical- 前缀。可选字段 topic、primaryKeyword、batch、order、related 用于专题、关键词记录、审读顺序和明确关联。topic 在 src/data/blog-topics.ts 中维护。batch 是审读批次，不是定时发布设置。博客列表每页 20 篇，分页归档 noindex/follow，专题与正文保留索引；首页只列 5 篇博客。

200 篇专项检查：node_modules/.bin/tsx scripts/audit-articles-200.ts（Windows 可使用 tsx.cmd）。检查目录匹配、正文结构、来源域名、日期、关联文章和文本相似度，原始结果见 docs/audit/articles-200.json。该结果不能自动证明每个观点都完整或所有事实永远准确。

关联阅读按共享标签自动排序，按稳定标识消除同分随机性。推荐专题在 src/data/topics.ts；核心站点参数在 src/data/site.ts 和 astro.config.mjs（迁移域名时一起修改并重跑验收）。

发布前依次执行 npm run check、npm run build、npm test。浏览器检查需先启动 preview，再执行 npm run audit:browser。Windows 内容加载器通过 Node 原生 createRequire 加载官方 astro/loaders，解决 Vite 内容加载 CommonJS 依赖的兼容问题；本次已在 Node 24 上验证。

每页 meta last-modified 是编辑日期。postbuild 根据各页日期生成 Sitemap，不使用每次构建时间。修改专题或固定页正文时，需同步调整该页日期；不要自动给全站换日期。

SEO 自动审计检查标题、描述、H1、Canonical、Robots、Schema、Sitemap；链接审计检查内链、资源、锚点和首页可达；内容校验检查唯一品牌、来源、价格一致性、重复正文、基础长度和错误测试声明。这些不能替代人工审读，不能自动证明所有事实绝对正确。
