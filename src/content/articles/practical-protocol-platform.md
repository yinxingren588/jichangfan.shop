---
title: "同品牌不同平台协议不同，怎样整理兼容表？"
description: "以当前官方帮助为基础，按系统和客户端版本分别记录，未知格子保留待核实。"
category: "blog"
date: "2026-10-21"
updated: "2026-10-21"
tags: ["协议","入门"]
topic: "protocol"
primaryKeyword: "vpn机场"
batch: 4
order: 72
related: ["practical-expired-link","practical-config-export-risk"]
sources: [{"title":"WireGuard：配置与密钥入门","url":"https://www.wireguard.com/quickstart/"},{"title":"WireGuard：官方安装入口","url":"https://www.wireguard.com/install/"},{"title":"Proton VPN：分流功能与平台说明","url":"https://protonvpn.com/support/protonvpn-split-tunneling"}]
draft: false
---

以当前官方帮助为基础，按系统和客户端版本分别记录，未知格子保留待核实。

## 关键判断

同品牌并不保证所有系统有完全相同选项。兼容表应注明核验日期，升级后再复查变化项。

## 三步检查

### 1. 列出实际设备版本

记录完整版本，不只写最新版。支持情况可能按操作系统、芯片或客户端渠道区分；查看官方文档时，也要确认选中的是自己的平台。

### 2. 查对应平台文档

先找与当前功能有关的变化、已知问题和迁移要求。升级后用原来可用的任务复测；时间先后只是线索，不直接证明故障由更新引起。

### 3. 把协议与功能分别填表

时间记录应能相互对应，必要时明确时区。系统、应用日志与后台可能采用不同显示方式；日期相同也不保证处于同一观察窗口。

## 具体例子

兼容表可按“系统版本、客户端版本、协议、对应官方文档、核验日”设列。没有查到手机端某协议时就留待核实，不能因为电脑端有这个选项而自动填上支持。

## 容易忽略的边界

不要从桌面端截图补写手机端不存在或尚未确认的按钮。

客户端名称不能替代协议和格式说明。导入、分流、更新和卸载都要结合具体实现；本组用小范围、可恢复的操作顺序解释配置问题，避免把不同工具的语法混成一套。

## 常见问题

### 导入成功就意味着配置正确吗？

导入成功主要说明格式被接受。还应检查节点是否齐全、规则是否符合预期、任务能否完成，以及断开后是否可恢复。

## 进一步阅读与参考

- [订阅链接失效，重新购买是第一步吗？](/blog/practical-expired-link/)
- [导出配置给别人排错前，哪些内容要删？](/blog/practical-config-export-risk/)
- [协议与配置主题目录](/blog/topics/protocol/)

官方参考：[WireGuard：配置与密钥入门](https://www.wireguard.com/quickstart/)、[WireGuard：官方安装入口](https://www.wireguard.com/install/)、[Proton VPN：分流功能与平台说明](https://protonvpn.com/support/protonvpn-split-tunneling)。它们用于核对概念与平台边界，本文步骤为编辑整理，不表示所有软件具有同一功能。具体按钮和当前支持情况请读相应官方帮助；没有用官方宣传冒充本站实测。
