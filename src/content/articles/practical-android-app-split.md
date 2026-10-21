---
title: "Android 分应用分流怎样做一组验收？"
description: "先列明应经过与应直连的应用，再分别重建任务观察，支持范围以产品文档为准。"
category: "blog"
date: "2026-10-21"
updated: "2026-10-21"
tags: ["Android","设备","协议"]
topic: "android"
primaryKeyword: "vpn推荐"
batch: 6
order: 110
related: ["practical-android-import-qr","practical-android-notification"]
sources: [{"title": "Android Developers：VPN 服务、常开和分应用机制", "url": "https://developer.android.com/develop/connectivity/vpn"}, {"title": "Google：Android 企业设备的 VPN 配置范围", "url": "https://support.google.com/work/android/answer/9213914"}]
draft: false
---

Android 分应用分流应拿一组‘应该走 VPN’与‘应该排除’的应用分别验收。Android VPN API 支持允许列表或排除列表，列表更改通常需要重建 VPN 连接；具体客户端如何展示这些能力仍应看当前版本说明。

## 具体检查步骤

1. 先查客户端采用允许列表还是排除列表，记录原设置。选择已安装的应用 A 和 B，写清各自预期，不把‘没勾选’默认理解成固定路径。

2. 保存规则后按产品要求重新建立 VPN，再关闭并重新打开两款应用以建立新连接。工作资料中的同名应用应单独辨认，不能拿个人资料列表代替工作应用设置。

3. 分别执行能重复的小任务，并查看客户端连接记录或自己可控制的服务访问记录。若应用不能显示出口，就只报告已确认的功能和日志，不用浏览器出口代替全部应用。

## 怎样根据结果继续判断

| 观察结果 | 下一步 |
| --- | --- |
| A 走连接，B 保持预期原路径 | 记录当前版本与结果，完成这一组验收 |
| 排除的 B 反而完全离线 | 检查是否开启无 VPN 阻断 |
| 修改列表后无变化 | 确认是否重建隧道、选中了正确应用身份 |

## 一个可对照的排查场景

例如用户用允许列表只选一个浏览器，同时开启无 VPN 阻断，其他应用没有网络。这可能符合系统限制，并不是‘排除就直连’。需要先确定产品和系统在这组策略下的实际定义，再决定配置。

## 恢复与验收

保留旧列表截图并遮盖账户信息；有异常时恢复旧列表并重连。验收记录应包含列表模式、A/B 应用、阻断开关以及实际任务，让以后升级可重复比较。

## 常见问题

### 同一应用的克隆版会自动继承规则吗？

不能假定。克隆、多用户和工作资料可能拥有不同的应用身份或范围。应看厂商及客户端支持，分别识别和验证，不能只凭图标相同判断。

## 进一步阅读与参考

- [Android 扫码导入节点前，需要保护哪些资料？](/blog/practical-android-import-qr/)

- [Android 的常驻 VPN 通知，应该如何理解？](/blog/practical-android-notification/)

- [Android 实用检查主题目录](/blog/topics/android/)

- [Android Developers：VPN 服务、常开和分应用机制](https://developer.android.com/develop/connectivity/vpn)
- [Google：Android 企业设备的 VPN 配置范围](https://support.google.com/work/android/answer/9213914)
