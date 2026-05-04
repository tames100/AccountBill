import { formatDate } from "@/utils";
import { useLunarInfo } from "@/hooks/useLunarInfo";

export function useDate() {

  // 今天
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = todayDate.getMonth() + 1;
  const day = todayDate.getDate();
  const hour = todayDate.getHours();
  const minute = todayDate.getMinutes();
  const { lunarDay, lunarMonth, festival, getSomeLunarInfo } = useLunarInfo(todayDate)
  const lunar = lunarMonth + lunarDay

  const getSomeDate = (dateTime: Date) => {
    // 传进的天
    const someYear = dateTime.getFullYear();
    const someMonth = dateTime.getMonth() + 1;
    const someDay = dateTime.getDate();
    const someHour = dateTime.getHours();
    const someMinute = dateTime.getMinutes();

    const { lunarDay: someLunarDay, lunarMonth: someLunarMonth, festival: someFestival } = getSomeLunarInfo(dateTime)
    const someLunar = someLunarMonth + someLunarDay

    return {
      year: someYear,
      month: someMonth,
      day: someDay,
      hour: someHour,
      minute: someMinute,
      lunar: someLunar,
      lunarFestive: someFestival,
    }
  }

  // 昨天
  const yesterdayDate = new Date(year, 0, 1);


  // 每月第第一天时周几
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 周日为0，周五=5
  // 计算日期再某月中
  const daysInMonth = new Date(year, month + 1, 0).getDate();


  return {
    today: {
      todayDate,
      today: formatDate(todayDate),
      todayLunar: lunar,
      todayLunarFestive: festival,
      nowYear: year,
      nowMonth: month,
      nowDay: day,
      nowHour: hour,
      nowMinute: minute,
    },
    getSomeDate,

    firstDayOfMonth,
    daysInMonth,
  }
}