/**
 * 格式化当前金额
 * @param amount
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const baseNum = 10000 // 一万为底
const unit = ["万", "亿"]

export function formatAmount(num: number): string {
  let res = ""
  if (num > 10 * baseNum * baseNum) {
    // 十亿万以上，两位小数，加上单位
    res = `${ (num / (baseNum * baseNum)).toFixed(2) }${ unit[1] }`
  } else if (num > 10 * baseNum) {
    // 十万以上
    res = `${ (num / baseNum).toFixed(2) }${ unit[0] }`
  } else if (num < 10 * baseNum) {
    // 十万以下
    res = num.toLocaleString("zh-CN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  }
  return res
}

export function formatCurrencyWithSign(amount: number): string {
  const formatted = formatCurrency(amount);
  return amount >= 0 ? `+${ formatted }` : `-${ formatted }`;
}


/**
 * 格式化日期
 * @param date
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 格式化时间
 * @param date
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * 格式化日期和时间
 * @param date
 */
export function formatDateTime(date: Date): string {
  return `${ formatDate(date) } ${ formatTime(date) }`;
}

export function getRelativeDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return '今天';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return '昨天';
  } else {
    return `${ date.getMonth() + 1 }月${ date.getDate() }日`;
  }
}

export function parseDate(dateStr: string): Date {
  return new Date(dateStr);
}

export function formatDateStr(dateStr: string): string {
  return getRelativeDate(parseDate(dateStr));
}
