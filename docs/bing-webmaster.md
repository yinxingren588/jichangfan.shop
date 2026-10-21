# Bing Webmaster Tools

以下步骤需要站长登录账号与控制域名，不在本地交付中声称已完成。

1. 打开 https://www.bing.com/webmasters/ ，添加 https://jichangfan.shop 。
2. 选择站长工具提供的验证方法：DNS、HTML 文件或 Meta。DNS 与 HTML 文件按页面给出的真实值操作；Meta 可填构建环境变量 BING_SITE_VERIFICATION 后重新部署。
3. 验证成功后，在 Sitemaps 提交 https://jichangfan.shop/sitemap-index.xml 。确认平台显示已处理，不以提交动作代替抓取结果。
4. URL Inspection 分别检查首页、一个推荐专题、一篇教程和一个品牌页，核对 HTTP、抓取可用性、Canonical 与索引状态。未索引时阅读工具给出的具体原因。
5. 依 docs/indexnow.md 验证公网 key 文件，再提交新增与修改 URL。HTTP 200 仅表示接收；202 表示待验证，两者均非收录证明。
6. 在 Search Performance 查看展示、点击、查询词和落地页，按实际意图修改内容。不要无依据增加同义重复页。
7. 在平台当前的索引覆盖报告（可能名为 Site Explorer 或 Index Coverage）与抓取问题报告中检查未索引、软 404、重定向、服务器与抓取错误。界面名称可能变化，以当前平台为准。
8. 收到错误时先复查在线响应、robots、站点地图和内链，再重新请求检查。只在页面有实质改动时更新内容日期。

本站已提供独立元信息、静态正文、正确域名、面包屑、Organization/WebSite/Article/BlogPosting/ItemList（按适用页面）、内链和 XML 站点地图。没有使用隐藏内容、关键词堆砌、门页或买链接方案。

官方说明：https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a ，https://www.indexnow.org/documentation 。Bing 自行决定抓取、收录与排名，无法保证首页。
