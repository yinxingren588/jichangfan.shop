---
title: "GB 和 GiB 的区别，为什么会影响流量对账？"
description: "先区分十进制和二进制单位，再比较软件、文件和服务后台的计量显示。"
category: "blog"
date: "2026-10-21"
updated: "2026-10-21"
tags: ["流量","预算"]
topic: "traffic"
primaryKeyword: "性价比机场"
batch: 2
order: 31
related: ["practical-upload-accounting","practical-mixed-multiplier"]
sources: [{"title":"Just My Socks：官方套餐标称流量资料","url":"https://www.justmysocks.net/members/cart.php"},{"title":"Proton VPN：数据配额说明","url":"https://protonvpn.com/support/does-protonvpn-have-bandwidth-limit"}]
draft: false
---

先区分十进制和二进制单位，再比较软件、文件和服务后台的计量显示。

## 关键判断

1GB 按十进制为十亿字节，1GiB 为二的三十次方字节。单位差异可能解释部分数值差距，但不是所有差额的原因。

## 三步检查

### 1. 记录各处使用的单位

传输速率与文件容量要先统一单位。Mb/s 中的 b 表示比特，按字节估算时还需要除以八；最终网络消耗另受传输开销和任务变化影响。

### 2. 统一换算后再对照

对账时同时写出统计起止、单位和扣除规则。客户端本次运行的数字与服务后台整个账期的数字，不能在未对齐条件时直接比较。

### 3. 保留上下行和倍率口径

先分清消耗的是用户传输量还是套餐配额。若倍率随节点或日期变化，就分别记录；不能用一个特殊节点的系数推算整个账户的全部用量。

## 具体例子

按定义，1GB 是 1,000,000,000 字节，1GiB 是 1,073,741,824 字节。同一个文件用两种单位显示时数字不同，先完成单位换算，再继续检查倍率、上下行与后台更新时间。

## 容易忽略的边界

不能看到不相等就认定服务商多扣流量，还需要排除开销、后台同步和显示延迟。

标称配额、实际传输量、流量倍率和账期是不同信息。这里从具体用量问题入手，用公开口径和明确的算术前提理解成本，不给资料缺失的套餐补写实际单位价格。

## 常见问题

### 软件和后台数字不同，就代表多扣了吗？

不能直接下结论。先对齐时间窗口、单位、上传计量和倍率，再核对后台更新方式；无法解释的差异，提交脱敏记录请服务商说明。

## 进一步阅读与参考

- [上传流量会不会计入机场套餐？](/blog/practical-upload-accounting/)
- [多个机场节点倍率不同，怎么估算混合消耗？](/blog/practical-mixed-multiplier/)
- [流量与计费主题目录](/blog/topics/traffic/)

官方参考：[Just My Socks：官方套餐标称流量资料](https://www.justmysocks.net/members/cart.php)、[Proton VPN：数据配额说明](https://protonvpn.com/support/does-protonvpn-have-bandwidth-limit)。它们用于核对概念与平台边界，本文步骤为编辑整理，不表示所有软件具有同一功能。具体按钮和当前支持情况请读相应官方帮助；没有用官方宣传冒充本站实测。
