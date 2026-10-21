---
title: "读 WireGuard 配置前，哪些字段要当作凭据？"
description: "读 WireGuard 配置时，PrivateKey 和 PresharedKey 必须当作秘密；PublicKey 可以用于识别 Peer，但不应与私钥混淆。Address、Endpoint、AllowedIPs 和 DNS 则分别表达不同网络职责。"
category: "blog"
date: "2026-10-21"
updated: "2026-10-21"
tags: ["协议","入门"]
topic: "protocol"
primaryKeyword: "vpn机场"
batch: 4
order: 63
related: ["practical-official-app-or-client","practical-allowedips-concept"]
sources: [{"title":"WireGuard：配置字段与运行状态","url":"https://git.zx2c4.com/wireguard-tools/about/src/man/wg.8"},{"title":"WireGuard：wg-quick 路由与 DNS","url":"https://git.zx2c4.com/wireguard-tools/about/src/man/wg-quick.8"},{"title":"WireGuard：Cryptokey Routing","url":"https://www.wireguard.com/"}]
draft: false
---

读 WireGuard 配置时，PrivateKey 和 PresharedKey 必须当作秘密；PublicKey 可以用于识别 Peer，但不应与私钥混淆。Address、Endpoint、AllowedIPs 和 DNS 则分别表达不同网络职责。

## 先看 Interface 与 Peer

Interface 通常描述本端密钥与接口相关设置；Peer 描述对端公钥、端点及允许地址范围。一个文件可以有多个 Peer，字段所在段落会改变含义。不要把服务端示例里的地址和密钥复制到自己的客户端。

## 字段区别表

| 字段 | 应怎样理解 |
| --- | --- |
| PrivateKey | 本端私钥，绝不公开 |
| PublicKey | 对端公钥，用于认证与关联 |
| PresharedKey | 可选共享秘密，同样保密 |
| Endpoint | 对端主机与端口，不是出口证明 |
| AllowedIPs | Peer 相关 IP 范围，参与密钥路由 |
| Address / DNS | 常由管理工具处理的接口与解析设置 |

wg 与 wg-quick 接受的完整字段范围不同。

## 查看运行状态也要注意秘密

wg 的不同输出选项可包含私钥或共享密钥，尤其是配置导出和脚本格式。排错优先只记录必要的握手时间、收发计数与脱敏端点。不要把终端全部输出直接贴到公开工单，也不要用带真实密钥的命令行截图演示。

## 一个易混字段示例

假设配置里 Address 是隧道内部私有地址，Endpoint 是公网域名，外部网站显示的又是服务商出口 IP。三者不同是常见设计，并不自动意味着配置错误。应分别核对本端接口、连接入口与目标看见的来源，不能随意互换。

## 导入前的可信检查

从提供方可信渠道取得针对本设备的档案，检查是否包含未知脚本或工具扩展项。wg-quick 支持接口建立前后的脚本钩子，执行能力超出纯连接参数，不能不经阅读就加载不明配置。其他平台是否支持相同钩子必须查其实现。

## 发现外泄怎样恢复

在服务商或管理员处撤销对应设备密钥并生成新配置，再更新所有需要该身份的设备。若共享密钥也外泄，由维护方安排轮换。改文件名、删除二维码或重装应用不能撤销旧密钥；旧备份按仍有秘密处理。

## 补充核对细节

证书、密码和订阅字段在其他协议中可能承担类似身份作用，但 WireGuard 的密钥结构有自己的定义。不要因为文件里没有用户名和密码，就把整份配置当作公开资料。备份与二维码中的私钥具有相同敏感性，撤销设备后也应处理不再必要的副本。

## 常见问题

### 公钥与私钥可以互换试试吗？

不能。它们承担不同角色，错误交换会破坏认证并可能暴露本端秘密。

### 复制整份配置到另一台设备更方便吗？

可能造成身份复用和管理冲突，应按提供方的设备配置流程分别授权。

## 进一步阅读与参考

- [官方 VPN 应用与第三方客户端，应该怎样选择？](/blog/practical-official-app-or-client/)
- [AllowedIPs 是什么？为什么不能随意照抄？](/blog/practical-allowedips-concept/)
- [协议与配置主题目录](/blog/topics/protocol/)

- [WireGuard：配置字段与运行状态](https://git.zx2c4.com/wireguard-tools/about/src/man/wg.8)
- [WireGuard：wg-quick 路由与 DNS](https://git.zx2c4.com/wireguard-tools/about/src/man/wg-quick.8)
- [WireGuard：Cryptokey Routing](https://www.wireguard.com/)

本文为官方资料研究与配置阅读指南，未在用户系统执行更改。不同客户端的界面和参数支持以所用版本官方文档为准。
