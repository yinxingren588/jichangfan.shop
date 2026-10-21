---
title: "TUN 模式与系统代理，选之前应该了解什么？"
description: "系统代理与 TUN 是不同的接入方式。系统代理通常依赖应用遵守代理设置；TUN 使用虚拟网络接口配合路由接管流量。TUN 能扩大覆盖，但不等于自动处理所有应用、DNS 与双栈。"
category: "blog"
date: "2026-10-21"
updated: "2026-10-21"
tags: ["协议","入门"]
topic: "protocol"
primaryKeyword: "vpn机场"
batch: 4
order: 69
related: ["practical-global-vs-rule","practical-subscription-refresh"]
sources: [{"title":"mihomo：TUN 与路由配置","url":"https://wiki.metacubex.one/config/inbound/tun/"},{"title":"Apple：代理设置","url":"https://support.apple.com/en-au/guide/mac-help/mchlp2591/mac"},{"title":"mihomo：模式、端口与控制接口","url":"https://wiki.metacubex.one/config/general/"}]
draft: false
---

系统代理与 TUN 是不同的接入方式。系统代理通常依赖应用遵守代理设置；TUN 使用虚拟网络接口配合路由接管流量。TUN 能扩大覆盖，但不等于自动处理所有应用、DNS 与双栈。

## 先看自己的任务是否被接入

浏览器通常容易使用系统代理，终端、游戏或某些应用可能有独立网络实现。若目标不遵守系统代理，需要它自己的代理选项或受支持的路由接管方式。不要把“浏览器能开”当成整台设备都已经按同一路径联网。

## 两种方式的取舍

| 维度 | 系统代理 | TUN |
| --- | --- | --- |
| 接入机制 | 应用使用指定代理 | 虚拟接口与路由 |
| 维护重点 | 端口、PAC、应用行为 | 权限、路由、DNS 与排除范围 |
| 局域网 | 可能依赖代理绕过项 | 需核对私网路由与发现行为 |
| 协议支持 | 取决于代理和应用 | 仍取决于内核、协议与平台 |

不以表格宣称某产品完整覆盖全部流量。

## 启用前先保存基线

记录当前模式、系统代理、本地资源与目标任务。确认客户端官方支持当前系统和权限，再选择最小满足需求的方式。TUN 参数如路由、DNS 劫持、MTU 都有实现细节，不能照抄网上完整模板覆盖服务商设置。

## 一个终端未接入的例子

假设浏览器通过本地代理成功，但终端工具失败。先核对该工具自己的代理选项与环境变量；若改用产品支持的 TUN 后任务恢复，可以说接入范围改变帮助了这次任务，不能据此断言 TUN 在所有场景更安全或更快。

## 验证应覆盖四类任务

测试目标应用、普通公网、局域网设备以及退出或断开后的网络状态。若支持 IPv6，另查双栈路径；若有断线保护，按官方流程验收。客户端显示“已启用”只是控制状态，实际请求与日志才说明任务走向。

## 遇到回环或断网怎样恢复

先用客户端自己的开关断开 TUN，恢复最后可用模式和系统代理，重新建立连接。若曾同时运行另一个 VPN，先确认两者官方共存说明。不要直接删除系统网卡或所有路由；保留系统、版本和脱敏日志供维护方检查。

## 常见问题

### TUN 本身是一种加密协议吗？

不是。它是虚拟网络接口相关机制，承载协议和加密能力由实际实现决定。

### 开 TUN 就不需要规则了吗？

不一定。接管以后仍可能按规则选择直连、代理或拒绝，要看客户端设计。

## 进一步阅读与参考

- [全局和规则模式，怎样根据任务选择？](/blog/practical-global-vs-rule/)
- [自动更新订阅应该多频繁？先看服务商说明](/blog/practical-subscription-refresh/)
- [协议与配置主题目录](/blog/topics/protocol/)

- [mihomo：TUN 与路由配置](https://wiki.metacubex.one/config/inbound/tun/)
- [Apple：代理设置](https://support.apple.com/en-au/guide/mac-help/mchlp2591/mac)
- [mihomo：模式、端口与控制接口](https://wiki.metacubex.one/config/general/)

本文为官方资料研究与配置阅读指南，未在用户系统执行更改。不同客户端的界面和参数支持以所用版本官方文档为准。
