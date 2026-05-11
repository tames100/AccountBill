type FormatDate = "yyyy-MM-dd" | "yyyy-M-d" | "yyyy年MM月dd日" | "yyyy年M月d日"

type FormatDateForMonthDay = "MM-dd" | "M-d" | "MM月dd日" | "M月d日"

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

// 有符号的金额
export function formatCurrencyWithSign(amount: number): string {
  const formatted = formatCurrency(amount);
  return amount >= 0 ? `+${ formatted }` : `-${ formatted }`;
}


/**
 * 格式化日期
 * @param date
 * @param format
 */
export function formatDate(date: Date, format: FormatDate = "yyyy-MM-dd"): string {
  const year = date.getFullYear()
  const m = (date.getMonth() + 1).toString()
  const d = date.getDate().toString()
  const mm = m.padStart(2, '0')
  const dd = d.padStart(2, '0')

  let res = `${ year }-${ mm }-${ dd }`
  if (format === "yyyy-M-d") {
    res = `${ year }-${ m }-${ d }`
  } else if (format === "yyyy年M月d日") {
    res = `${ year }年${ m }月${ d }日`
  } else if (format === "yyyy年MM月dd日") {
    res = `${ year }年${ mm }月${ dd }日`
  }
  return res;
}

// 格式化时间，月和日
export function formatDateForMonthDay(date: Date, format: FormatDateForMonthDay = "MM-dd") {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const mm = m.toString().padStart(2, "0");
  const dd = m.toString().padStart(2, "0");

  let res = `${ mm }-${ dd }`;
  if (format === "M-d") {
    res = `${ m }-${ d }`
  } else if (format === "M月d日") {
    res = `${ m }月${ d }日`
  } else if (format === "MM月dd日") {
    res = `${ mm }月${ dd }日`
  }
  return res
}

/**
 * 格式化时间十二小时制
 * @param date
 */
export function formatTime12(date: Date): string {
  const hours = (date.getHours() % 12).toString().padStart(2, '0');
  const minutes = (date.getMinutes() % 12).toString().padStart(2, '0');
  return `${ hours }:${ minutes }`;
}

/**
 * 格式化时间二十四小时制
 * @param date
 */
export function formatTime24(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${ hours }:${ minutes }`;
}

/**
 * 格式化日期和时间
 * @param date
 * @param formatTime
 */
export function formatDateTime(date: Date, formatTime: "hour12" | "hour24" = "hour24"): string {
  return `${ formatDate(date) } ${ formatTime === "hour12" ? formatTime12(date) : formatTime24(date) }`;
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
