import {priceLabel,displayPlan,traffic,evidenceLabel,unitCost,type Airport} from './airports';
export const compareFields:[string,(a:Airport)=>string][]=[
 ['服务类型',a=>a.kind==='proxy'?'代理订阅':'商业 VPN'],
 ['展示套餐',a=>displayPlan(a)?.name||'尚未核实'],
 ['金额与付款口径',a=>priceLabel(displayPlan(a))],
 ['套餐流量',a=>traffic(displayPlan(a))],
 ['全部套餐参考',a=>a.plans.map(p=>p.name+'：'+priceLabel(p)+'，'+traffic(p)).join('；')],
 ['优惠码',a=>a.coupon?a.coupon+'（站长提供；适用条件待确认）':'未提供优惠码'],
 ['资料状态',evidenceLabel],
 ['每 GB 实际成本',a=>{const p=displayPlan(a);const cost=p?unitCost(p):undefined;return cost===undefined?(p?.unlimited?'不适用（不限量）':'尚未核实（倍率或配额缺失）'):cost.toFixed(5);}],
 ['节点地区',a=>a.regions.join('、')||'完整地区列表尚未核实'],
 ['协议',a=>a.protocols.join('、')||'尚未核实'],
 ['设备限制',a=>a.deviceLimit||'尚未核实'],
 ['AI 支持',a=>a.aiSupport?.join('；')||'尚未核实'],
 ['流媒体支持',a=>a.streamingSupport?.join('；')||'尚未核实'],
 ['注意事项',a=>a.disadvantages.join('；')],
 ['资料整理日期',a=>a.lastVerified||'尚未核实']
];
