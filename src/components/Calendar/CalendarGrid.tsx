import { StyleSheet, View, Text } from "react-native";
import { useDate } from "@/hooks";
import { Transaction } from "@/types/transaction";
import CalendarGridItem from "@/components/Calendar/CalendarGridItem";
import { CalendarCellWidth } from "@/constants/calendar";
import { colors, fontSizes } from "@/constants/theme";

interface DayData {
  date: number;
  transactions: Transaction[];
  lunarMonth?: string;   // 农历月
  lunarDay?: string;     // 农历日
  festival?: string;     // 公历节日或节气
  isToday?: boolean;
}

export default function CalendarGrid() {
  // 补充星期标题
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const { today, firstDayOfMonth, daysInMonth, getSomeDate } = useDate();


  const calendarGrid: (DayData | null)[][] = [];
  let dayCounter = 1;

  for (let row = 0; row < 6; row++) {
    const week: (DayData | null)[] = [];
    for (let col = 0; col < 7; col++) {
      if (row === 0 && col < firstDayOfMonth) {
        week.push(null); // 前月空白
      } else if (dayCounter > daysInMonth) {
        week.push(null); // 下月空白
      } else {
        const isToday = dayCounter === +today.today;
        const {
          lunarFestive,
          lunar,
        } = getSomeDate(new Date(today.nowYear, today.nowMonth, dayCounter));
        // 组合显示农历文本（通常只显示日，但可以保留月用于某些节日）
        const lunarDisplay = lunarFestive || lunar;
        week.push({
          date: dayCounter,
          transactions: [],
          lunarMonth: lunar,
          lunarDay: lunarDisplay,
          festival: lunarFestive,
          isToday,
        });
        dayCounter++;
      }
    }
    calendarGrid.push(week);
    if (dayCounter > daysInMonth) break;
  }

  return (
    <View>
      {/* 日历头部 */ }
      <View style={ styles.calendarHeader }>
        <View style={ styles.weekRow }>
          { weekDays.map(day => (
            <Text key={ day } style={ styles.weekdayText }>
              { day }
            </Text>
          )) }
        </View>
      </View>

      { calendarGrid.map(
        (week, rowIdx) => (
          <View key={ rowIdx } style={ styles.weekRow }>
            { week.map((day, colIdx) => <CalendarGridItem key={ colIdx } day={ day } index={ colIdx }/>
            ) }
          </View>
        )) }
    </View>
  )
}


const styles = StyleSheet.create({

  calendarHeader: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  weekdayText: {
    fontSize: fontSizes.normal,
    color: colors.mutedText,
  },

  weekRow: {
    flexDirection: 'row',
    width: CalendarCellWidth * 7,
    justifyContent: 'space-around',
    backgroundColor: colors.primary,
    gap: 8,
    marginBottom: 8,
  },
})