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

未登录或修改 Cloudflare 账户，也未推送远端。线上是否成功需以应用配置后的新部署日志为准。

官方依据：[Cloudflare 构建版本配置](https://developers.cloudflare.com/pages/configuration/build-image/)。
