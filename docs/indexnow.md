# IndexNow

## 初始化与发布

交付已运行 indexnow:init，config/indexnow.json 保存域名专用 key；public/<key>.txt 内容为 key。它是域名所有权验证材料，不是 Cloudflare 或 GitHub 凭据。更换 key 时修改配置并生成同名验证文件，重新构建部署。

如果改用环境变量 INDEXNOW_KEY，需要同步生成 public/对应key.txt，不能只改环境变量。

## 命令

```text
npm run indexnow
npm run indexnow -- --url https://jichangfan.shop/blog/vpn-selection/
npm run indexnow -- --file docs/changed-urls.txt
npm run indexnow -- --submit
npm run indexnow -- --url https://jichangfan.shop/ --single --submit
```

默认 dry run，不发请求。未指定 URL 时，以 dist/page-manifest.json 和本地成功提交状态比较，只选择新增与改变的页面；第一次无历史状态会列出全部可索引 URL。--all 是显式列出全部，正常维护不用它。命令不会挂在 build 后自动提交。

## 实际提交前的保护

只允许正式域名、无查询参数的可索引 Canonical；检查本地 dist key，再读取公网 HTTPS 验证文件匹配 key。每批最多 10000 URL。批量使用 POST，--single 使用单 URL GET。

429、5xx 和网络失败最多尝试 3 次，退避 1、2 秒；403 等永久错误不重试。响应记录至 .indexnow/http.jsonl（Git 忽略）。200 才更新成功哈希；202 记录到 pending.jsonl 并保留待验证状态。脚本不将任一响应解释为已收录。

状态存于当前电脑 .indexnow，换电脑或 CI 需要保留状态才能维持同样的增量提交范围。本期只自动处理新增/更新；删除 URL 请用其他明确清单按 IndexNow 官方协议单独通知，不能留在公开 Sitemap。

官方协议：https://www.indexnow.org/documentation
