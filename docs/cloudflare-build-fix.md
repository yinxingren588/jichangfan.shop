# Cloudflare 构建失败修复

截图中的失败原因是构建环境使用 Node.js 22.16.0，而当前 Astro 要求至少 22.22.0。本项目固定为已验证的 **24.18.0**。

本轮已在项目根目录新增 `.node-version` 与 `.nvmrc`，两份文件内容均为 `24.18.0`；GitHub 检查也读取 `.node-version`。依赖版本和网站内容未调整。

## 现在如何重新构建

1. 打开 Cloudflare 中的 Pages 项目设置，新增或修改环境变量：名称 `NODE_VERSION`，值 `24.18.0`。生产和预览环境保持一致。
2. 保存设置，重新部署。构建命令保持 `npm run build`，输出目录保持 `dist`。
3. 使用 Git 上传源码时，将 `.node-version` 和 `.nvmrc` 一起放到 `package.json` 所在目录并提交，不要漏掉这两个以点开头的文件。

外层“Cloudflare构建修复配置.zip”只包含这两个版本文件，便于补充到已有仓库；“jichangfan.shop-源码.zip”是已整合修复的完整项目。

## 验证结果

已用 Node.js 24.18.0 执行 `npm run build`，成功生成 355 个 HTML 与 343 条可索引网址；两份版本文件、当前验证环境和 GitHub 检查配置一致。

经站长明确授权，已将两个版本文件提交到 GitHub 的 `main` 分支，提交号为 `88fdcf1a45d25107737b7498c1f5328eaeebb908`。Cloudflare Pages 返回 `Deployed successfully`，GitHub 质量检查通过；公网首页实测返回 HTTP 200。

本次远端仅新增 `.node-version` 和 `.nvmrc`，没有把本地后续文章、品牌或界面更新额外发布到线上。远端部署与本地完整源码的范围分别记录。

- [已部署网站](https://498d1cf5.jichangfan-shop.pages.dev)
- [实际修复提交](https://github.com/yinxingren588/jichangfan.shop/commit/88fdcf1a45d25107737b7498c1f5328eaeebb908)
- 详细成功记录：`docs/audit/cloudflare-live.json`。

官方依据：[Cloudflare 构建版本配置](https://developers.cloudflare.com/pages/configuration/build-image/)。
