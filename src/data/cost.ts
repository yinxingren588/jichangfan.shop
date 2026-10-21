export interface CostInput {
  payment: number;
  months: number;
  quotaGB: number;
  quotaPeriod: 'month' | 'total';
  multiplier: number;
  usageGB: number;
}

export function calculateCost(input: CostInput) {
  const {payment, months, quotaGB, quotaPeriod, multiplier, usageGB} = input;
  if (![payment, months, quotaGB, multiplier, usageGB].every(Number.isFinite)
    || payment <= 0 || payment > 1e9 || months < 1 || months > 120 || !Number.isInteger(months)
    || quotaGB < 0.01 || quotaGB > 1e9 || multiplier < 0.000001 || multiplier > 1e6
    || usageGB < 0 || usageGB > 1e9 || !['month','total'].includes(quotaPeriod)) {
    throw new Error('请填写有效的付款额、配额、倍率和用量；比较月数为 1–120 的整数。');
  }
  const monthlyPayment = payment / months;
  const monthlyQuota = quotaGB / multiplier / (quotaPeriod === 'total' ? months : 1);
  const exceedsQuota = usageGB > monthlyQuota;
  return {
    monthlyPayment,
    monthlyQuota,
    capacityUnitCost: monthlyPayment / monthlyQuota,
    usageUnitCost: usageGB > 0 && !exceedsQuota ? monthlyPayment / usageGB : undefined,
    exceedsQuota,
  };
}
