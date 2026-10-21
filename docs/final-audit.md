# 机场翻验收：Editorial 杂志式设计框架

验收日期：2026-10-21。正式域名 https://jichangfan.shop ，品牌机场翻 JICHANGFAN。

## 新版设计

整站改为暖白、深墨绿与香槟金的杂志式设计。重建首页、导航、页脚、品牌卡片与连接地图；博客目录桌面双栏，手机单栏；文章使用衬线标题、宽松正文与目录侧栏。替换favicon和分享图片，提供明显键盘焦点、移动菜单及减少动画偏好支持。

本次更换视觉框架和页面组件，底层仍为Astro、TypeScript和Tailwind的静态生成，未迁移技术栈。所有内容地址、站点域名、品牌数据与博客正文保持原有结构。设计说明见design-system.md。

## 内容与资料

加入用户提供的全部29个品牌、原样推广链接、12个优惠码，整理58档套餐的人民币参考价格与流量。保留原有5个品牌，当前共34个。原先新增的200篇博客保留，博客总计205篇，教程与百科另有10篇。

新增 /coupons/ 汇总，29个品牌各有资料页和套餐分析页，首页有全部品牌入口。比较工具支持全部34个品牌中的2–4家，显示所有档位、计费周期、配额和优惠码。复制按钮与推广入口可用。

## 数据边界

29个品牌的价格和流量取自用户指定 https://jiediantuijian.shop/airport/ 对应公开参考表，全部标为第三方参考，未在服务商结账页核验。12个优惠码和29个推广链接由用户提供，未确认折扣幅度、有效期或适用套餐；17个品牌显示未提供优惠码。表格金额未套用优惠码，不能当作当前可下单金额保证。

飞猫云、Firefly机场、快狸入门档采用年付折合月价；其年付总额未知，不补造。边缘节点为86元/168元年付总额，配额来自参考页月度列。飞V一次性档的200GB按总配额展示。速界入门配额保留约数；梯子云350GB列与最高500GB备注冲突已说明。

未复制参考站的测速、零丢包、评分或解锁宣传，没有购买账号或进行性能测试。原有5个品牌的官方来源仍单独保留。推广链接旁、页脚、编辑与隐私政策已披露商业关系，外链使用 sponsored nofollow noopener noreferrer。

## 实际检查结果

| 项目 | 状态 | 本次结果 |
| --- | --- | --- |
| 类型与组件检查 | PASS | 76个检查文件，0错误、0警告；2个来自忽略目录临时脚本的未使用导入提示 |
| 生产构建 | PASS | 330个HTML页面，318条可索引URL |
| 内容来源与声明 | PASS | 34个品牌；29个reference-data、5个official-data；无tested记录 |
| 用户品牌专项 | PASS | 29品牌、58档套餐、12代码；完整地址含fragment及代码大小写一致 |
| 计费周期回归 | PASS | 年付折合价、年付总额、一次性配额分别校验 |
| 元信息与结构化数据 | PASS | 唯一标题和描述、单H1、Canonical、Robots、OG、Schema、可见ItemList链接 |
| Sitemap | PASS | 正式域名和真实编辑日期，排除搜索、404与后续分页 |
| 内链与资源 | PASS | 16710个内部引用，329个正常页面可从首页到达 |
| 计算与IndexNow单元测试 | PASS | 6项通过；未实际提交IndexNow |
| 三种屏幕尺寸 | PASS | 987次访问，1440/768/375px；HTTP200且无整页溢出 |
| 浏览器交互 | PASS | 品牌筛选、比较2–4家、拒绝第五家、移除、URL恢复、优惠码复制、搜索、手机菜单 |
| 原博客目录 | PASS | 每页20篇、末页5篇、10个主题；搜索覆盖249条资料 |
| 无障碍自动检查 | PASS | 11类代表页面，Axe未检出违规 |
| 无JavaScript | PASS | 首页卡片与34品牌完整静态比较表可读 |
| 当前Lighthouse | NOT TESTED | 历史报告不代表本版性能评分 |
| 优惠码兑换与结账 | NOT TESTED | 未注册、登录、购买、应用或兑换代码 |
| 全部推广链路可达性 | NOT TESTED | 保留用户提供的全部入口，不保证服务商跳转或后续站点状态 |
| 公网部署与Bing收录 | NOT TESTED | 未操作Cloudflare、DNS或站长后台，不保证收录和排名 |

本表对应docs/audit下本次记录；自动检查不能替代人工审读、订单核验或真实网络测试。上一版品牌资料验收保留在history/partner-brands-final-audit.md。历史200篇内容审计保留在history/articles-200-final-audit.md，原始建站记录在history/initial-final-audit.md。

## 新版预览

- audit/home-first-screen.png：新版首页首屏。
- audit/home-desktop.png 与 home-mobile.png：完整首页。
- audit/blog-desktop.png：双栏博客索引。
- audit/article-desktop.png：文章阅读页。
- audit/coupons-desktop.png：新版优惠码页面。

浏览器987次访问与11类页面Axe检查针对新版设计重跑，全部通过。首页目录标题随后作短句排版调整，最终重新构建并检查该页。没有重新进行品牌报价核验。

## 文件与维护

- docs/partner-plans.csv：58行套餐、29品牌、代码、完整链接和参考来源。
- docs/partner-brand-sources.json：本次公开事实摘录与修正记录。
- docs/partner-brands.md：字段含义和后续维护流程。
- src/data/partner-brands.json：站长提供的品牌、推广链接及代码。
- src/data/partner-plans.json：第三方参考套餐。
- 外层文件夹内为最新源码包、部署包、套餐表、截图与原200篇博客导出。

GitHub推送与提交号见外层交付说明。IndexNow保持默认预演，不自动提交。部署可按deployment.md使用dist目录。
