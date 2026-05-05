import lunisolar from "lunisolar";
import festivals from "lunisolar/markers/festivals.zh-cn";
import zhCn from 'lunisolar/locale/zh-cn'
import { printLog } from "@/utils/printLog";

lunisolar.locale(zhCn)

export const useLunarInfo = (date: Date) => {

  const dateStr = formatDate("yyyy-MM-dd", date);

  const festiveData = formatDate("MMDD", date);

  const lunarDate = lunisolar(dateStr);

  const lunarMonthName = lunarDate.lunar.getMonthName();
  const lunarDayName = lunarDate.lunar.getDayName();

  // lunisolar 的 festival 属性可以直接获取当前日期的节日/节气
  // solarTerm 属性获取节气对象
  let festival: string | undefined;

  // 优先获取节气
  const solarTermName = lunarDate.solarTerm?.name;
  if (solarTermName) {
    festival = solarTermName;
  } else {

    const lunarFestival = festivals[0].markers[festiveData];
    if (lunarFestival) {
      const lunarFestivalName = Array.isArray(lunarFestival) ? lunarFestival[0].name : lunarFestival.name;

      printLog("获取今日的节日", lunarFestivalName);
      if (lunarFestivalName) {
        festival = lunarFestivalName;
      }
    }
  }

  const getSomeLunarInfo = (dateTime: Date) => {

    const festiveData = formatDate("MMDD", dateTime);

    const lunarDate = lunisolar(formatDate("yyyy-MM-dd", dateTime));

    const lunarMonthName = lunarDate.lunar.getMonthName();
    const lunarDayName = lunarDate.lunar.getDayName();

    let festival: string | undefined;

    // 优先获取节气
    const solarTerm = lunarDate.solarTerm;
    if (solarTerm) {
      festival = solarTerm.name;
    } else {
      const lunarFestival = festivals[0].markers[festiveData];
      if (lunarFestival) {
        const lunarFestivalName = Array.isArray(lunarFestival) ? lunarFestival[0].name : lunarFestival.name;
        if (lunarFestivalName) {
          festival = lunarFestivalName;
        }
      }
    }
    return {
      lunarMonth: lunarMonthName,
      lunarDay: lunarDayName,
      festival,
    }
  }

  return {
    lunarMonth: lunarMonthName,
    lunarDay: lunarDayName,
    festival,
    getSomeLunarInfo
  };
}

type formatType = "yyyy-MM-dd" | "MMDD";

function formatDate(format: formatType, date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (format === "yyyy-MM-dd") return `${ year }-${ parseDate(month) }-${ parseDate(day) }`;
  if (format === "MMDD") return `${ parseDate(month) }${ parseDate(day) }`;
  return ""
}

function parseDate(num: number) {
  return `${ String(num).padStart(2, "0") }`
}