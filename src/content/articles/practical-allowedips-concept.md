---
title: "AllowedIPs 是什么？为什么不能随意照抄？"
description: "AllowedIPs 既参与 WireGuard 发送时选择 Peer，也约束从该 Peer 收到的内部来源地址。它不是网站域名名单；照抄全默认路由或企业网段，可能改变流量范围并与现有局域网冲突。"
category: "blog"
date: "2026-10-21"
updated: "2026-10-21"
tags: ["协议","入门"]
topic: "protocol"
primaryKeyword: "vpn机场"
batch: 4
order: 64
related: ["practical-wireguard-config-fields","practical-keepalive-purpose"]
sources: [{"title":"WireGuard：Cryptokey Routing","url":"https://www.wireguard.com/"},{"title":"WireGuard：wg-quick 路由与 DNS","url":"https://git.zx2c4.com/wireguard-tools/about/src/man/wg-quick.8"}]
draft: false
---

AllowedIPs 既参与 WireGuard 发送时选择 Peer，也约束从该 Peer 收到的内部来源地址。它不是网站域名名单；照抄全默认路由或企业网段，可能改变流量范围并与现有局域网冲突。

## 先区分密钥路由与系统路由

WireGuard 协议把公钥与一组隧道 IP 范围关联。系统是否把某目标送进接口，还取决于客户端或路由工具。wg-quick 会根据 AllowedIPs 自动建立相应路由，而其他管理器可能有自己的策略。因此字段相同，不代表所有客户端行为完全相同。

## 把常见写法读成范围

| 写法 | 表达的地址范围 |
| --- | --- |
| 192.0.2.10/32 | 一个示例 IPv4 地址 |
| 192.0.2.0/24 | 一个示例 IPv4 网段 |
| 0.0.0.0/0 | 全部 IPv4 目的范围 |
| ::/0 | 全部 IPv6 目的范围 |

这些保留地址用于说明语法，不是可以直接使用的服务配置。

## 修改前逐项核对

先确认目标是全设备出站还是只访问特定远程网段，再核对本地局域网是否同网段。保存当前档案、已有路由说明和客户端版本。企业网络由管理员提供范围；不要为了“更全”把所有 Peer 都填成全默认路由。

## 一个网段冲突的例子

假设家庭打印机所在网络与单位远程网络都使用同一个私有网段。把这个范围指向隧道后，访问本地设备可能去错位置。它不是打印机突然故障，应向管理员核对地址规划和支持的路由方案，不能仅靠添加更宽的范围解决。

## 怎样验证改变是否符合目标

建立新档案后，分别测试应经过隧道的目标、不应经过的本地资源及 IPv4/IPv6。握手成功只说明 Peer 能协商，不能证明路由和访问权限正确。检查工具时避免公开包含私钥的配置输出。

## 失败后如何回退

断开测试档案并恢复最后可用配置，按客户端官方方式重建连接。若远程地址仍不可达，记录目的地址、地址族与症状，由管理方检查服务端转发和权限。扩大 AllowedIPs 不会自动赋予远端防火墙或业务系统访问权。

## 补充核对细节

多 Peer 情况还要核对前缀是否互相覆盖，以及工具如何选择更具体的范围。客户端配置和服务端配置通常不对称，不能把服务端的整段 Peer 列表复制到终端。需要变更远程网段时，应让维护者同时确认两端路由与访问控制，避免只改本端后出现单向通信。

## 常见问题

### 只写 0.0.0.0/0 就覆盖 IPv6 吗？

不会。IPv4 和 IPv6 范围不同，双栈行为还受客户端支持和策略影响。

### AllowedIPs 能直接按网站域名分流吗？

它使用 IP 前缀。域名规则通常属于上层客户端的另一个功能。

## 进一步阅读与参考

- [读 WireGuard 配置前，哪些字段要当作凭据？](/blog/practical-wireguard-config-fields/)
- [WireGuard Keepalive 什么时候需要了解？](/blog/practical-keepalive-purpose/)
- [协议与配置主题目录](/blog/topics/protocol/)

- [WireGuard：Cryptokey Routing](https://www.wireguard.com/)
- [WireGuard：wg-quick 路由与 DNS](https://git.zx2c4.com/wireguard-tools/about/src/man/wg-quick.8)

本文区分协议原理与客户端实现；示例用于解释配置判断，未在读者设备上执行修改，产品界面与支持项以对应版本官方文档为准。
