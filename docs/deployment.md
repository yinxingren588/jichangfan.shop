# Cloudflare Pages 正式部署

正式域名： https://jichangfan.shop 。此交付未代登录 Cloudflare，也未改动 DNS。

1. 登录 Cloudflare，选择 Workers & Pages → 创建 Pages → 连接 Git，授权仓库 yinxingren588/jichangfan.shop。
2. 分支 main；框架 Astro；根目录留空；构建命令 npm run build；输出 dist。
3. 环境变量 NODE_VERSION=24.18.0。BING_SITE_VERIFICATION 可填写站长工具分配的真实验证码；不要填写演示值。
4. 保存并部署，在部署日志确认构建成功。GitHub Actions 的 quality 工作流同时检查内容、SEO 与链接；如果检查失败不要推广该版本。
5. 在自定义域名添加 jichangfan.shop，按 Cloudflare 指引完成 DNS 和证书签发。正式站只使用 HTTPS 裸域名。
6. 若还使用 www 子域名，先在 Cloudflare 绑定该域名并配置到裸域名的永久重定向；public/_redirects 提供转发规则，但必须先让请求抵达托管平台。不要把所有不存在路径回退首页，保留真实 404。
7. 对 pages.dev 预览域名，在 Cloudflare Access/预览保护与搜索控制中限制公开索引。网站 Canonical 已指向正式域名，不应把预览域名当正式入口推广。
8. 检查首页、移动导航、搜索、对比、Sitemap、robots、随机不存在路径的 404，以及所有验证文件。
9. 完成 docs/bing-webmaster.md 中的站长验证和 Sitemap 提交，然后执行 IndexNow 公网验证与提交。

## 可直接上传

也可使用 Cloudflare Pages 的直接上传，上传 dist 内部的全部文件。直接上传与 Git 集成是不同部署模式，请根据账号界面选择。需要在本地更新并重新上传才能同步内容。

## 回滚

从 Cloudflare 部署历史回滚到已知通过验收的版本；源码使用 Git 历史回滚并重新执行构建。保留数据核验日期，不在回滚时机械刷新日期。

## 上线前仍由站长完成

确认联系方式和品牌资料符合经营安排；本版本纠错渠道为公开 GitHub Issues，不虚构邮箱。确认当地适用规则和服务用途。核实当前套餐、流量倍率、退款与续费。网络实测可后续独立开展并发布方法。

官方参考：https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
