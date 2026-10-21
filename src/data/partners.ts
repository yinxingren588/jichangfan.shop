import brands from './partner-brands.json';
import records from './partner-plans.json';
import editorial from './brand-editorial.json';
import type {Airport,Plan} from './airports';
export type BrandEditorial=(typeof editorial)[keyof typeof editorial];
export const brandEditorial=editorial as Record<string,BrandEditorial>;
const colors=['#1e5ab6','#7052a2','#197460','#a0512d','#475b7b'];
export const partnerAirports:Airport[]=brands.map((b,i)=>{
 const r=records.find(r=>r.slug===b.slug)!,e=brandEditorial[b.slug],plans=r.plans as Plan[];
 const primary=plans.find(p=>p.period==='month')||plans[0];
 return {id:b.slug,slug:b.slug,name:b.name,kind:'proxy',monogram:b.name.slice(0,1),color:colors[i%colors.length],affiliateUrl:b.affiliateUrl,coupon:'coupon' in b?b.coupon:undefined,
 description:`${b.name}：${e.focus}。收录两档价格、流量、设备数与站长提供的购买入口。`,
 startingPrice:primary.price,currency:'CNY',plans,protocols:e.protocols,regions:e.regions,deviceLimit:e.deviceLimit,aiSupport:[],streamingSupport:[],
 advantages:[`${plans[0].name}与${plans[1].name}的价格和流量可逐档比较`,`${plans[0].devices}与${plans[1].devices}的并发边界有对应资料`,`${e.protocols.join('、')}兼容性可按实际配置核对`],
 disadvantages:[e.boundary,'流量倍率、重置时刻、加购与退款细则需阅读当期套餐条款'],
 suitableFor:[e.caseLabel.replace(/为例$/,'的读者'),`需要比较${e.focus}的用户`],sources:[r.source],lastVerified:r.checkedAt,testStatus:'owner-confirmed',
 conclusion:e.focus+'。'+e.selection,
 analysis:[e.selection,e.boundary],
 clients:`指定资料页列出 ${e.protocols.join('、')}。具体订阅格式、节点类型和客户端最低版本需按实际配置核对。涉及自研客户端时，应从品牌入口查看可信下载及系统支持说明。`,
 line:`指定资料页将线路描述为“${e.line}”。此处为来源声明，端口规格、线路名称和节点地区不构成机场翻的速度、延迟或稳定性实测。`};
});
