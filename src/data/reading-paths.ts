export interface ReadingLink {title:string;url:string;detail:string;}
export const primaryDestinations=[
 {keyword:'机场推荐',url:'/'},
 {keyword:'机场节点',url:'/glossary/node/'},
 {keyword:'性价比机场',url:'/ranking/value/'},
 {keyword:'梯子推荐',url:'/recommend/beginner/'},
 {keyword:'vpn',url:'/glossary/vpn/'},
 {keyword:'vpn机场',url:'/blog/vpn-vs-proxy/'},
 {keyword:'vpn节点',url:'/glossary/node/'},
 {keyword:'vpn推荐',url:'/blog/vpn-selection/'},
];
export interface TopicGuide {
  title:string;
  description:string;
  answer:string;
  decisions:[string,string,string][];
  routes:ReadingLink[];
  takeaway:string;
}
export const topicGuides:Record<string,TopicGuide>={
 selection:{
  title:'机场推荐怎么选：预算、套餐与购买决策',
  description:'从需求表、付款预算和客户端兼容开始筛选机场推荐，附选择顺序、候选取舍与20篇具体问题指南。',
  answer:'把“选哪一家”拆成设备能否使用、费用是否承担得起、配额是否够用、退出条件是否清楚四个问题。先核对硬性条件，再保留少量候选；套餐名、节点数量和促销标签都需要回到具体资料判断。',
  decisions:[['第一次使用','先确认系统、客户端与配置格式','读新手选择，再看对应设备教程'],['有明确月预算','记录实际付款总额，而非只看折合月价','按相同周期比较费用'],['十几家候选难取舍','逐项标记满足、未知和不满足','先补关键未知，再做短期验证'],['准备长期续费','复查续费金额、取消与退款条件','保留当时订单与条款']],
  routes:[{title:'新手与梯子推荐选择顺序',url:'/recommend/beginner/',detail:'先分清服务类型与设备支持。'},{title:'VPN 推荐：按需求缩小范围',url:'/blog/vpn-selection/',detail:'用具体条件核对产品资料。'},{title:'候选从十几家缩小到三家',url:'/blog/practical-shortlist-three/',detail:'照着虚构筛选表完成一轮取舍。'}],
  takeaway:'例如每月需要60GB，标称100GB的2倍率套餐只对应约50GB实际传输量。应先处理配额不足，再讨论价格是否便宜。更多算例见成本计算器；以上不是品牌报价。',
 },
 traffic:{
  title:'性价比机场怎么算：流量、倍率与续费',
  description:'用付款总额、流量周期、节点倍率与实际用量计算性价比机场成本，区分月付、年付、总量包和续费支出。',
  answer:'性价比需要同时看总支出与实际用量。比较前先确认配额是每月重置还是总量共用，再核对节点倍率；满配额单位成本与只用掉一部分流量的摊销成本，回答的是不同问题。',
  decisions:[['月付与年付并列','记录一次付款总额和续费周期','再折算月均，不把折算价当月付'],['同一套餐有多种倍率','确认实际使用哪些节点','按用量构成核算扣量'],['流量常常用不完','按预计实际传输量摊销支出','先判断小套餐是否够用'],['备用总量包','确认有效期、重置与过期规则','不推断每月增加新配额']],
  routes:[{title:'套餐成本计算器',url:'/ranking/value/#cost-calculator',detail:'同时看满配额与预计用量成本。'},{title:'流量倍率是什么意思',url:'/glossary/traffic-multiplier/',detail:'把标称配额换成相应传输量。'},{title:'核对流量重置与账单日期',url:'/guides/traffic-reset-check/',detail:'区分续费、重置和总量有效期。'}],
  takeaway:'假设月付20元、100GB、固定2倍率，满配额可传输约50GB，单位成本0.4元/GB；若实际只用20GB，则摊销为1元/GB。先看真实需求，再看大配额。算例不对应商家套餐。',
 },
 network:{
  title:'机场节点怎么选：地区、延迟与连接排查',
  description:'理解机场节点与VPN节点的入口、出口、延迟和任务结果，按固定条件观察网络，并找到对应排查步骤。',
  answer:'先确认节点与客户端兼容，再选择符合任务要求的地区和线路条件。探测延迟、服务器在线状态和实际应用任务是不同证据；记录同一网络下的结果，才能比较切换节点前后的变化。',
  decisions:[['节点同地区却表现不同','记录标识、协议、时段和运营商','用同一任务分别观察'],['列表在线但不能访问','检查基础网络与服务方公告','分开记录本地失败与官方状态'],['一次测速很好但任务失败','核对任务、模式和持续时间','不把峰值当作任务通过'],['换网络后才出问题','记录Wi-Fi或蜂窝等条件','另开一组观察，不混用样本']],
  routes:[{title:'机场节点与VPN节点基础',url:'/glossary/node/',detail:'看懂入口、出口与地区标签。'},{title:'稳定性观察与记录方法',url:'/recommend/stable/',detail:'固定条件，保留失败样本。'},{title:'已连接但不能上网的排查',url:'/guides/troubleshooting/',detail:'从基础网络逐步缩小问题范围。'}],
  takeaway:'节点甲延迟较低但任务失败，乙延迟略高却完成任务，不能只按一个探测数字决定。先复查任务路径与配置；一条网络的一次结果也不能代表长期或所有地区的表现。',
 },
 protocol:{
  title:'VPN机场与代理配置：协议、订阅与分流',
  description:'分清VPN机场、商业VPN、代理订阅和协议配置，按客户端支持处理导入、分流、更新与恢复。',
  answer:'先分清拿到的是账号、订阅链接还是协议配置文件，再阅读客户端的对应导入说明。名称相近不代表输入格式一致；修改前保留原状态，验证真实应用和退出后的恢复情况。',
  decisions:[['订阅链接导入失败','检查格式与客户端支持范围','保留错误，不上传到不明转换站'],['拿到WireGuard配置','确认签发来源与设备适用条件','使用对应协议客户端说明'],['浏览器可用而应用失败','核对模式、分流和应用代理设置','分别验证应用任务'],['规则更新后出错','记录变更与原配置备份','一次恢复一个条件']],
  routes:[{title:'VPN机场与代理订阅区别',url:'/blog/vpn-vs-proxy/',detail:'分清服务、客户端和输入格式。'},{title:'订阅链接首次导入',url:'/guides/subscription-import/',detail:'核对格式，完成连接检查。'},{title:'配置备份与恢复',url:'/guides/configuration-backup/',detail:'在变更之前留下可恢复的记录。'}],
  takeaway:'一个配置文件改成另一种扩展名，并不会改变它的协议。先看客户端支持的输入，导入失败时检查原始提示；含有令牌的订阅链接应按凭据保管。',
 },
 windows:{
  title:'Windows VPN 使用与故障排查',
  description:'按安装准备、系统代理、睡眠恢复和连接故障整理Windows VPN使用路径，提供20篇具体问题的检查与恢复指南。',
  answer:'先分清Windows内置连接、独立VPN应用和代理客户端。遇到失败时记录系统与应用版本，确认普通网络，再核对当前客户端模式和具体应用任务；保留原设置，逐步排查。',
  decisions:[['第一次安装','确认软件来源和适用系统','先完成安装前准备'],['浏览器与应用表现不同','检查系统代理与应用自身设置','分别执行真实任务'],['睡眠唤醒后断开','记录恢复时间和客户端状态','复查原连接，再比较变化'],['想直接重置全部网络','先备份已知设置并缩小问题层次','使用有对应恢复步骤的方法']],
  routes:[{title:'Windows 安装与连接准备',url:'/guides/windows/',detail:'从可信来源、权限和首次检查开始。'},{title:'Windows 系统代理检查',url:'/guides/windows-system-proxy/',detail:'区分代理设置与客户端连接。'},{title:'睡眠唤醒后连接不恢复',url:'/blog/practical-windows-sleep-reconnect/',detail:'记录条件，检查唤醒前后的变化。'}],
  takeaway:'同一个浏览器的成功不能覆盖其他应用。可以把出错时点、应用、网络和修改过的设置写成四列，先解决能复现的问题，再判断是否需要改变客户端或服务。',
 },
 android:{
  title:'Android VPN 使用与网络切换',
  description:'按Android权限、后台、始终开启选项和网络切换整理VPN使用指南，区分厂商界面差异与客户端行为。',
  answer:'Android的厂商界面、系统版本和客户端实现可能不同。先用自己设备上的官方说明定位权限与连接入口，再观察后台、锁屏和Wi-Fi切换后的任务结果，避免套用其他机型的位置。',
  decisions:[['首次请求VPN权限','确认请求来自准备使用的客户端','读权限提示并核对来源'],['锁屏后连接变化','记录应用状态、系统版本和时间','观察后再检查相关后台设置'],['开启始终连接选项','先理解当前客户端支持与退出方式','准备恢复普通网络的步骤'],['Wi-Fi与蜂窝切换失败','记录发生在哪种网络与时点','按同一任务复查连接']],
  routes:[{title:'Android 首次连接准备',url:'/guides/android/',detail:'核对权限、配置与设备条件。'},{title:'始终开启VPN的检查',url:'/guides/android-always-on/',detail:'理解支持范围和恢复方法。'},{title:'Wi-Fi与蜂窝切换检查',url:'/guides/wifi-cellular-handoff/',detail:'网络变化后重新验证任务。'}],
  takeaway:'先在前台完成一次连接和任务，再观察锁屏或切换网络后的差异。每次只改变一个条件，有助于判断问题来自网络切换、后台行为还是配置本身。',
 },
 ios:{
  title:'iPhone 与 iPad VPN 设置与恢复',
  description:'整理iOS与iPadOS的VPN应用、配置与描述文件检查，按首次连接、失败诊断和移除恢复找到对应教程。',
  answer:'先区分应用提供的连接、单独的VPN配置和组织管理的描述文件。系统中的连接标识只表示相应状态，具体路由、应用行为和账户权限还要分别核对；受管理设备应按管理方说明操作。',
  decisions:[['第一次使用个人服务','核对应用来源与当前系统支持','读安装与首次连接准备'],['出现陌生配置或描述文件','先确认归属和管理关系','不要误删组织要求的配置'],['连接后某个应用报错','保留原始提示并核对具体任务','分别排查网络和账户条件'],['准备停用或移除','记录原配置与恢复需要的材料','先理解断开和删除的差别']],
  routes:[{title:'iOS 与 iPadOS 连接准备',url:'/guides/ios/',detail:'分清应用、权限与配置方式。'},{title:'移除VPN配置前的检查',url:'/guides/remove-vpn-profile/',detail:'确认归属，再准备退出恢复。'},{title:'断开后恢复普通连接',url:'/guides/disconnect-restore/',detail:'检查当前任务和原网络状态。'}],
  takeaway:'个人VPN教程不能替代学校或公司的管理要求。遇到配置归属不清时先向管理方确认；个人设备也应保留恢复信息，再决定是否移除配置。',
 },
 macos:{
  title:'macOS VPN 使用与代理设置',
  description:'围绕Mac客户端来源、权限、系统代理和退出恢复整理VPN使用路径，帮助区分系统设置与应用行为。',
  answer:'先记录macOS版本、芯片类型和客户端版本，按对应说明安装与授权。出现连接差异时分别看系统代理、客户端模式和应用任务；退出应用后仍应核对普通网络是否恢复。',
  decisions:[['首次安装或更新','核对官方来源、版本与系统要求','保留原配置，再按帮助操作'],['系统代理仍有旧设置','记录当前值和归属','结合客户端说明逐项恢复'],['浏览器成功而其他应用失败','检查应用自身配置和连接模式','不要把一次访问当作全局结论'],['移除客户端后网络异常','核对残留代理与配置归属','使用明确的恢复步骤']],
  routes:[{title:'macOS 客户端安装准备',url:'/guides/macos/',detail:'先核对来源、权限与退出流程。'},{title:'macOS 系统代理检查',url:'/guides/macos-proxy-settings/',detail:'保留当前值再判断差异。'},{title:'客户端更新前后检查',url:'/guides/client-update/',detail:'记录版本与配置变化。'}],
  takeaway:'遇到网络异常时，先留下“变更前能做什么、变更了什么、现在哪个任务失败”的记录。这样回退时有明确起点，不必同时改动所有网络设置。',
 },
 scenarios:{
  title:'VPN节点与应用访问：AI、视频与账户条件',
  description:'把VPN节点连接、应用访问、AI账户条件与视频播放分开验证，按实际错误选择网络排查或平台规则核对路径。',
  answer:'先记录具体任务和错误：是所有网页失败，还是只有某个账户或功能受限。网络连接不能自动赋予平台的账户资格与内容权益，节点地区标签也不能证明某项服务一直可用。',
  decisions:[['所有应用都超时','先检查基础网络与客户端','走通用连接排查路径'],['只有一个平台报错','核对原始提示与官方帮助','区分账户、网络与平台条件'],['视频能打开首页却不能播放','核对会员、设备与播放权限','另记持续播放的观察结果'],['宣传写着支持某服务','要求平台、日期与测试条件','未获证据时保持未知']],
  routes:[{title:'AI服务访问条件检查',url:'/recommend/ai/',detail:'分清网络状态、账户和功能资格。'},{title:'流媒体播放观察方法',url:'/recommend/streaming/',detail:'分开记录目录、权限与持续播放。'},{title:'通用连接故障排查',url:'/guides/troubleshooting/',detail:'当基础访问也失败时从这里开始。'}],
  takeaway:'如果普通网页可访问，而某个账户提示资格问题，下一步应读平台官方说明；如果所有应用都失败，再回到基础网络诊断。不要仅因更换节点就推断所有层次都已解决。',
 },
 privacy:{
  title:'VPN 隐私与配置管理：凭据、日志与退出',
  description:'理解VPN保护范围、订阅凭据、诊断日志和本地配置，按信息类型处理脱敏、凭据重置与退出恢复。',
  answer:'先确认要保护的是账户、订阅令牌、诊断记录还是本地配置。VPN连接与应用账号、设备权限和本地文件属于不同层次；分享排障材料时只提供所需信息，保留必要记录并去除凭据。',
  decisions:[['向别人求助','准备错误、时间、版本与网络条件','先脱敏再分享诊断材料'],['订阅链接已外泄','确认服务方的重置或撤销方式','不要仅删除聊天记录就认为失效'],['准备换设备','核对配置备份和设备限制','按可信方式迁移，不公开令牌'],['准备停止使用','理解断开、注销与删除配置的差别','检查普通网络恢复与本地材料']],
  routes:[{title:'VPN 的作用与边界',url:'/glossary/vpn/',detail:'分清连接技术、客户端与账户权益。'},{title:'日志分享前脱敏',url:'/guides/logs-redaction/',detail:'保留诊断信息，移除私人数据。'},{title:'订阅链接重置',url:'/guides/subscription-link-reset/',detail:'处理凭据暴露后的配置更新。'}],
  takeaway:'账号密码、订阅URL与诊断日志不宜混在一张未遮盖的截图里。先整理复现条件，再只分享定位问题所需的部分；是否撤销凭据应看服务方实际机制。',
 },
};

const articleTopics:Record<string,string>={
 windows:'windows','windows-system-proxy':'windows','wireguard-windows':'windows',
 android:'android','android-always-on':'android','wireguard-android':'android',
 ios:'ios',macos:'macos','macos-proxy-settings':'macos',
 node:'network',latency:'network',troubleshooting:'network','dns-check':'network','network-time-check':'network','hotel-wifi-login':'network','wifi-cellular-handoff':'network',
 'traffic-multiplier':'traffic','traffic-reset-check':'traffic','monthly-vs-yearly':'traffic',
 'vpn-selection':'selection','evaluate-evidence':'selection',
 'vpn-vs-proxy':'protocol',protocol:'protocol',linux:'protocol','subscription-import':'protocol','qr-import':'protocol','openvpn-connect':'protocol','subscription-refresh':'protocol','configuration-backup':'protocol','client-update':'protocol','firefox-proxy':'protocol','mullvad-split-tunneling':'protocol',
 vpn:'privacy','logs-redaction':'privacy','subscription-link-reset':'privacy','disconnect-restore':'privacy','remove-vpn-profile':'privacy','ipv6-connection-check':'privacy','device-limit-review':'privacy',
};
export function readingContext(entry:{id:string;data:{topic?:string;category:string}}){
 const id=(entry.data.topic&&topicGuides[entry.data.topic]?entry.data.topic:articleTopics[entry.id])||'selection';
 const guide=topicGuides[id]||topicGuides.selection;
 const self='/'+entry.data.category+'/'+entry.id+'/';
 const links=[{title:guide.title,url:'/blog/topics/'+id+'/',detail:'按问题浏览本专题。'},...guide.routes].filter(link=>link.url.split('#')[0]!==self).slice(0,3);
 return {id,guide,links};
}
