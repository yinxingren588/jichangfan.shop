import brands from './partner-brands.json';
import records from './partner-plans.json';
import type {Airport,Plan} from './airports';
const colors=['#1e5ab6','#7052a2','#197460','#a0512d','#475b7b'];
export const partnerAirports:Airport[]=brands.map((b,i)=>{
 const r=records.find(r=>r.slug===b.slug)!;
 const plans=r.plans as Plan[];
 const primary=plans.find(p=>p.period==='month')||plans[0];
 const planSummary=plans.map(p=>`${p.name}：人民币${p.price}元${p.period==='year-equivalent'?'为年付折合每月金额，年度总额待确认':p.period==='year'?'为年付总额':p.period==='one-time'?'为一次性价格':'按月付费'}，${p.trafficApprox?'约':''}${p.trafficGB}GB${p.period==='one-time'?'总配额':'/月参考配额'}`).join('；')+'。';
 return {id:b.slug,slug:b.slug,name:b.name,kind:'proxy',monogram:b.name.slice(0,1),color:colors[i%colors.length],affiliateUrl:b.affiliateUrl,coupon:'coupon' in b?b.coupon:undefined,
 description:`整理${b.name}的${plans.length}档套餐参考价、流量与${'coupon' in b?'站长提供的优惠码':'推广入口'}，购买前请确认当期订单条款。`,
 startingPrice:primary.price,currency:'CNY',plans,protocols:[],regions:[],advantages:['价格、付款周期与配额有对应参考来源','可逐档对比预算与流量'],disadvantages:['价格和配额尚未在服务商结账页核验','线路表现、退款规则与客户端兼容性待确认'],suitableFor:['希望先核对人民币预算与流量的读者'],sources:[r.source],lastVerified:r.checkedAt,testStatus:'reference-data',
 conclusion:`${b.name}已整理${plans.length}档套餐参考信息；先确认付款周期和流量重置规则，再核对最终支付金额。`,
 analysis:[planSummary,`${b.name}的套餐金额来自节点推荐站的公开参考表，不是机场翻的订单截图，也没有应用优惠码计算。${'coupon' in b?`站长提供的代码为${b.coupon}；折扣幅度、有效期和适用范围均未确认。`:'站长未提供该品牌的优惠码；本站不会把邀请参数当作优惠券。'}`,`比较${b.name}时，把可用流量、客户端要求、到期清零和退款条件放在同一份记录中。本文没有购买账户或开展测速，无法从标称配额推断高峰稳定性、游戏延迟或平台解锁效果。`],
 clients:'当前推广链接由站长提供；客户端与订阅协议请在服务商入口确认，本站尚未核验。',line:'参考表包含套餐名称中的线路描述，但本站未核验路由、带宽、节点归属或实测质量。'};
});
