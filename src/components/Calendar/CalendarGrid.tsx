import { View, Text } from "react-native";
import { useDate } from "@/hooks";
import CalendarGridItem from "@/components/Calendar/CalendarGridItem";
import { CalendarCellWidth, weekDaysOfFristRi } from "@/constants/calendar";
import { DayData } from "@/types/calendar";
import { useMemo, useCallback } from "react";

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  isCollapsed: boolean;
  getDayTransactions: (day: number) => {
    income: number;
    expense: number;
    transactions: any[];
  };
}

export default function CalendarGrid(props: CalendarGridProps) {
  const {
    currentDate,
    selectedDate,
    onDateSelect,
    isCollapsed,
    getDayTransactions,
  } = props;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const { firstDayOfMonth, daysInMonth, getSomeDate } = useDate();

  // 生成日历网格数据
  const calendarGrid = useMemo(() => {
    const grid: (DayData | null)[][] = [];
    let dayCounter = 1;

    for (let row = 0; row < 6; row++) {
      const week: (DayData | null)[] = [];
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < firstDayOfMonth) {
          week.push(null);
        } else if (dayCounter > daysInMonth) {
          week.push(null);
        } else {
          const isToday =
            dayCounter === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();
          const { lunarFestive, lunar } = getSomeDate(
            new Date(year, month, dayCounter),
          );
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
      grid.push(week);
      if (dayCounter > daysInMonth) break;
    }
    return grid;
  }, [daysInMonth, firstDayOfMonth, month, year]);

  // 获取选中日期所在周的数据
  const selectedWeekData = useMemo(() => {
    const selectedDay = selectedDate.getDate();
    const selectedWeekRow = calendarGrid.findIndex((week) =>
      week.some((day) => day !== null && day.date === selectedDay),
    );
    return selectedWeekRow >= 0
      ? calendarGrid[selectedWeekRow]
      : calendarGrid[0];
  }, [calendarGrid, selectedDate]);

  // 判断是否是选中日期
  const isSelected = useCallback(
    (day: number) => {
      return (
        day === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear()
      );
    },
    [month, year, selectedDate],
  );

  // 渲染日期行
  const renderWeekRow = (week: (DayData | null)[], rowIdx: number) => (
    <View key={rowIdx}>
      {week.map((day, colIdx) => {
        if (!day) {
          return <View key={colIdx} />;
        }

        const { income, expense } = getDayTransactions(day.date);
        const selected = isSelected(day.date);

        return (
          <CalendarGridItem
            key={colIdx}
            day={day}
            index={colIdx}
            income={income}
            expenses={expense}
            isSelected={selected}
            onPress={() => onDateSelect(new Date(year, month, day.date))}
          />
        );
      })}
    </View>
  );

  return (
    <View>
      {/* 日历头部 */}
      <View className="pt-4 pb-2">
        <View
          className={`flex-row w-[${CalendarCellWidth * 7}px] justify-around gap-2 mb-2`}
        >
          {weekDaysOfFristRi.map((day) => (
            <Text key={day} className="text-sm text-mutedText">
              {day}
            </Text>
          ))}
        </View>
      </View>

      {/* 日历网格 */}
      {isCollapsed
        ? // 折叠模式：只显示选中日期所在的一周
          renderWeekRow(selectedWeekData, -1)
        : // 展开模式：显示整月
          calendarGrid.map((week, rowIdx) => renderWeekRow(week, rowIdx))}
    </View>
  );
}
