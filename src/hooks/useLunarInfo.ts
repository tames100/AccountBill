import lunisolar from "lunisolar";
import festivals from "lunisolar/markers/festivals.zh-cn";

export const useLunarInfo = (date: Date) => {
  try {

    const dateStr = formatDate("yyyy-MM-dd", date);

    const festiveData = formatDate("MMDD", date);

    const lunarDate = lunisolar(dateStr);

    // 3. 获取农历月、日 (使用 lunar 属性)[reference:2].
    // 获取月份名 (如 '四月')
    const lunarMonthName = lunarDate.lunar.getMonthName();
    // 获取日期名 (如 '初八')
    const lunarDayName = lunarDate.lunar.getDayName();

    // 4. 获取公历节日、农历节日、节气 (使用 festival 和 solarTerm 属性)
    // lunisolar 的 festival 属性可以直接获取当前日期的节日/节气
    // solarTerm 属性获取节气对象
    let festival: string | undefined;

    // 优先获取节气
    const solarTerm = lunarDate.solarTerm;
    if (solarTerm) {
      festival = solarTerm.toString();
    } else {
      // 如果没有节气，再获取节日
      // markers 属性可以获取标记信息，但这里我们直接使用 festival 属性可能更简单
      // 注意：lunisolar 的 festival 属性通常返回字符串
      const lunarFestival = festivals[0].markers[festiveData];
      const lunarFestivalName = Array.isArray(lunarFestival) ? lunarFestival[0].name : lunarFestival.name;
      if (lunarFestivalName) {
        festival = lunarFestivalName;
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
        const lunarFestivalName = Array.isArray(lunarFestival) ? lunarFestival[0].name : lunarFestival.name;
        if (lunarFestivalName) {
          festival = lunarFestivalName;
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
  } catch (error) {
    console.error(error);
    return {
      lunarMonth: "",
      lunarDay: "",
      festival: "",
      getSomeLunarInfo: () => {
        return
      }
    }
  }
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