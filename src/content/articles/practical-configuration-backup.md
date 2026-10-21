---
title: "换客户端前，怎样备份订阅配置更稳妥？"
description: "换客户端前，应分别备份服务来源、本地自定义和恢复所需的版本信息。导出文件能否恢复取决于目标客户端支持，不能把“保存过一个 YAML”视为迁移已经有退路。"
category: "blog"
date: "2026-10-21"
updated: "2026-10-21"
tags: ["协议","入门"]
topic: "protocol"
primaryKeyword: "vpn机场"
batch: 4
order: 66
related: ["practical-keepalive-purpose","practical-rules-order"]
sources: [{"title":"OpenVPN Connect：导入连接档案","url":"https://openvpn.net/connect-docs/import-profile.html"},{"title":"mihomo：配置语法","url":"https://wiki.metacubex.one/handbook/syntax/"},{"title":"mihomo：订阅集合与刷新间隔","url":"https://wiki.metacubex.one/config/proxy-providers/"}]
draft: false
---

换客户端前，应分别备份服务来源、本地自定义和恢复所需的版本信息。导出文件能否恢复取决于目标客户端支持，不能把“保存过一个 YAML”视为迁移已经有退路。

## 分清三类资料

服务商提供的订阅或 VPN 档案负责连接参数；自定义规则、分流名单和 DNS 属于本地调整；应用设置还可能保存在自己的数据库。一次导出未必包含全部内容。先查原客户端导出范围，再决定哪些需要单独记录。

## 备份前核对来源和权限

从原服务商面板确认仍能获取连接资料，检查账号恢复方式和订阅有效期。保存客户端名称、版本、内核与系统。备份文件可能含认证秘密，使用受控的加密存储，避免发到公开仓库或无访问限制的共享链接。

## 迁移清单怎样列

| 项目 | 迁移前确认 |
| --- | --- |
| 订阅与节点 | 格式、令牌是否有效 |
| 自定义规则 | 顺序、策略组名称和规则源 |
| DNS 与路由 | 默认值与人工修改项 |
| 本地偏好 | 启动、快捷键、应用名单 |
| 恢复条件 | 原客户端、可用档案和登录方式 |

未知导出项目要写明，不能假设新客户端会自动识别。

## 先在新档案里验证

保留原客户端与最后可用档案，另建目标客户端配置。先检查语法与协议支持，再连接并测试一项核心任务、局域网与退出后联网。不要同时启动两个接管全局路由的程序来“比速度”，这样会给验证引入冲突。

## 一个规则迁移例子

假设新客户端可以识别节点，但不支持原来的进程分流规则。导入成功只是参数被读取，不能说明规则效果等同。应把不支持项标出，按目标官方语法重建最小规则；无法等价迁移时，先保留旧环境处理相关任务。

## 恢复失败时怎样判断

旧文件若引用在线订阅和规则源，离线副本可能不完整；令牌被撤销后旧备份也无法连接。把失败分为文件缺失、格式不兼容、认证失效和任务路径错误，再分别补齐。迁移成功后仍需按自己的保留策略处理秘密备份。

## 常见问题

### 备份能避免服务到期吗？

不能。它保存配置，不会延长服务权限，也不能恢复已撤销密钥。

### 需要把旧客户端马上卸载吗？

不必。先完成新环境验收，确认恢复渠道以后再按官方流程清理。

## 进一步阅读与参考

- [WireGuard Keepalive 什么时候需要了解？](/blog/practical-keepalive-purpose/)
- [分流规则顺序会影响连接结果吗？](/blog/practical-rules-order/)
- [协议与配置主题目录](/blog/topics/protocol/)

- [OpenVPN Connect：导入连接档案](https://openvpn.net/connect-docs/import-profile.html)
- [mihomo：配置语法](https://wiki.metacubex.one/handbook/syntax/)
- [mihomo：订阅集合与刷新间隔](https://wiki.metacubex.one/config/proxy-providers/)

本文区分协议原理与客户端实现；示例用于解释配置判断，未在读者设备上执行修改，产品界面与支持项以对应版本官方文档为准。
