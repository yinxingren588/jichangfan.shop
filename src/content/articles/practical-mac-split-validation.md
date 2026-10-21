---
title: "macOS 分流功能怎样验证，而不是只看开关？"
description: "macOS 分流要通过实际请求验证：应走 VPN 的任务是否进入隧道，应直连的任务是否保持原路径。应用名单或开关是配置意图，连接结果和日志才说明当前版本是否按预期执行。"
category: "blog"
date: "2026-10-21"
updated: "2026-10-21"
tags: ["macOS","设备","协议"]
topic: "macos"
primaryKeyword: "vpn推荐"
batch: 8
order: 148
related: ["practical-mac-keychain-account","practical-mac-app-store-direct"]
sources: [{"title":"Apple Developer：Packet Tunnel 的网络设置","url":"https://developer.apple.com/documentation/NetworkExtension/NEPacketTunnelProvider"},{"title":"mihomo：路由规则","url":"https://wiki.metacubex.one/config/rules/"},{"title":"Apple Developer：网络扩展能力","url":"https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.networking.networkextension"}]
draft: false
---

macOS 分流要通过实际请求验证：应走 VPN 的任务是否进入隧道，应直连的任务是否保持原路径。应用名单或开关是配置意图，连接结果和日志才说明当前版本是否按预期执行。

## 先明确分流依据

产品可能按应用、域名、IP 或路由分流，支持范围与权限不同。浏览器内部请求、辅助进程和扩展也未必被一个应用名称全部覆盖。Apple 的网络扩展允许不同网络处理方式，但不能由系统能力推断某个客户端已实现所有分流功能。

## 选择正反两类测试

列出一个必须经过隧道的低风险目标，以及一个必须保持直连的本地或公网目标。记录各自预期和观察方式，再启用分流。若只测成功的一侧，会遗漏过宽规则或根本没有接管的情况。

## 建议的验收表

| 项目 | 预期 | 观察方式 |
| --- | --- | --- |
| 目标应用 | 指定路径 | 对应进程连接与客户端日志 |
| 对照应用 | 另一条路径 | 同条件请求来源或路由 |
| 局域网 | 符合工作要求 | 实际访问必要资源 |
| IPv4/IPv6 | 符合产品说明 | 分地址族验证 |

无法观察的项目标为未验证，不填“通过”。

## 一个辅助进程例子

假设下载应用的主程序被列入分流，但真正传输由另一辅助进程执行，结果可能不符合预期。先查官方是否说明这一结构及如何配置，再重新建立下载连接。不要为一项任务给所有进程增加过宽例外。

## 避免被旧连接和缓存误导

切换策略后，已经建立的连接可能沿用原路径，页面缓存也可能完全不发请求。按客户端或应用说明重建测试连接，必要时选择可确认的新任务。公开出口查询只能验证那一个请求，不等于整套应用已经覆盖。

## 失败后怎样恢复

恢复原分流设置，重新连接并确认工作任务可用，再逐个增加必要规则。若产品不支持当前系统上的某种分流方式，应明确保留限制，不能用别的平台截图替代。日志脱敏后交给开发者，保留版本与复现时间。

## 常见问题

### 把浏览器列入名单就包含所有扩展吗？

不能保证。实现和辅助进程可能不同，需要按官方说明与实际连接验证。

### 分流通过一次以后就不用再测了吗？

系统、客户端和规则更新可能改变行为，核心任务变化后应复核。

## 进一步阅读与参考

- [Mac 保存的登录信息与 VPN 凭据，如何区分管理？](/blog/practical-mac-keychain-account/)
- [Mac 商店版与官网下载版，如何决定安装来源？](/blog/practical-mac-app-store-direct/)
- [macOS 使用主题目录](/blog/topics/macos/)

- [Apple Developer：Packet Tunnel 的网络设置](https://developer.apple.com/documentation/NetworkExtension/NEPacketTunnelProvider)
- [mihomo：路由规则](https://wiki.metacubex.one/config/rules/)
- [Apple Developer：网络扩展能力](https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.networking.networkextension)

本文是按官方文档整理的 Mac 使用与恢复方法，不包含对读者设备的实际操作；菜单名称、功能与组织管理要求应按当前版本核对。
