# 使用教程扩充至30篇

2026-10-21完成：保留原有5篇，新增25篇，合计30篇使用教程。博客仍为205篇，百科5篇，Markdown内容共240篇。

## 六组目录

1. 设备入门：Windows、macOS、Android、iOS与Ubuntu。
2. 配置导入：订阅、二维码、WireGuard Windows/Android、OpenVPN Connect。
3. 连接与分流：Windows系统代理、Mac代理、Android始终开启、Firefox代理、Mullvad Windows应用分流。
4. 故障排查：通用排查、DNS、日期与时区、公共Wi-Fi认证、Wi-Fi和移动数据切换。
5. 日常维护：流量账期、订阅更新、设备限制、客户端更新、配置备份。
6. 隐私与退出：日志脱敏、订阅凭据重置、退出恢复、移除配置、IPv4与IPv6观察。

每组5篇。新增正文每篇739–837个汉字，不含英文、数字和链接；每篇有适用范围、分步操作、结果检查或恢复方法、常见问题与相关文章。属于实用短教程，不冒充所有系统和账户均已执行的实验记录。

## 来源与范围

参考Microsoft、Apple、Google Android/Google Play、Ubuntu、Mozilla、WireGuard、OpenVPN、Proton与Mullvad的公开官方帮助。逐篇来源见文章末尾与guides-30-manifest.json，来源索引见guides-sources.json。Ubuntu帮助在搜索缓存中可读，后续直接请求曾暂时返回503；Apple动态帮助页会按系统版本显示不同界面。

软件具体入口和支持范围可能变化，应在实际操作前对照当前官方说明。Mullvad Windows分流只针对该应用；Proton的WireGuard手动流程只作为明确标注的操作参考，不表示29个推广品牌均提供相同协议或功能。

没有登录用户账户、执行VPN安装或更改用户系统设置；本次验证的是文章结构、来源、站内链接、目录与网页显示。未新增或修改品牌报价与优惠条件。

## 页面与交付文件

- 网站目录：/guides/，六组共30篇，主导航可到达。
- 首页教程入口标明30篇，搜索收录新教程，相关文章使用明确关联与同主题匹配。
- docs/guides-30-manifest.csv与.json：完整目录、分组、来源、篇幅、导出文件与新增标记。
- 外层“使用教程30篇”：全部30篇Markdown与目录CSV，原有5篇也包含在内。
- 最新源码包、部署包与“使用教程30篇.zip”一并交付。

## 后续维护

正文位于src/content/articles/；category为guides，topic与src/data/guide-topics.ts对应。目录按guide-topics中的稳定标识分组，新增时同时更新该列表、order、related与清单。日期只随真实修改更新。

npm test包含scripts/audit-guides.ts，核对30篇、25篇新增、六组各五篇、正文结构、来源域名、清单一致性、435组近重复比较和实际目录链接。相似度检查不等于事实或原创度认证。浏览器检查还会确认六组数量、教程跳转与手机显示。
