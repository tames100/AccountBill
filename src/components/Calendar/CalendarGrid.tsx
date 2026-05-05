import { StyleSheet, View, Text } from "react-native";
import { useDate } from "@/hooks";
import CalendarGridItem from "@/components/Calendar/CalendarGridItem";
import { CalendarCellWidth, weekDaysOfFristRi } from "@/constants/calendar";
import { colors, fontSizes } from "@/constants/theme";
import { DayData } from "@/types/calendar";


export default function CalendarGrid() {

  const { today, firstDayOfMonth, daysInMonth, getSomeDate } = useDate();


  const _computerDate = () => {
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
          const isToday = dayCounter === today.nowDay;
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
    return calendarGrid;
  }

  const calendarGrid: (DayData | null)[][] = _computerDate();

  const _computerAmout = ()=>{

    return {
      income: 1.11,
      expenses: 1.11,
    };
  }

  return (
    <View>
      {/* 日历头部 */ }
      <View style={ styles.calendarHeader }>
        <View style={ styles.weekRow }>
          { weekDaysOfFristRi.map(day => (
            <Text key={ day } style={ styles.weekdayText }>
              { day }
            </Text>
          )) }
        </View>
      </View>

      { calendarGrid.map(
        (week, rowIdx) => (
          <View key={ rowIdx } style={ styles.weekRow }>
            { week.map((day, colIdx) => <CalendarGridItem
              key={ colIdx }
              day={ day }
              index={ colIdx }
              income={ 0 }
              expenses={ 0 }/>
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
    gap: 8,
    marginBottom: 8,
  },
})