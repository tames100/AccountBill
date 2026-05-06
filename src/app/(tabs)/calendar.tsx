import React, { useState, useRef, useCallback, useMemo } from "react";
import { View, Animated, PanResponder } from "react-native";
import { LayoutComponent } from "@/components/Common";
import { CalendarTabHeader, CalendarContain } from "@/components/Calendar";
import { useTransactionStore } from "@/stores";

// 日历折叠高度
const FULL_CALENDAR_HEIGHT = 360;
const COLLAPSED_CALENDAR_HEIGHT = 72;

export default function Calendar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const animatedHeight = useRef(
    new Animated.Value(FULL_CALENDAR_HEIGHT),
  ).current;
  const transactionStore = useTransactionStore();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 切换折叠状态
  const toggleCollapse = useCallback(() => {
    const toValue = isCollapsed
      ? FULL_CALENDAR_HEIGHT
      : COLLAPSED_CALENDAR_HEIGHT;
    setIsCollapsed(!isCollapsed);
    Animated.spring(animatedHeight, {
      toValue,
      useNativeDriver: false,
      damping: 20,
      stiffness: 100,
    }).start();
  }, [isCollapsed, animatedHeight]);

  // 切换到上一个月
  const goToPrevMonth = useCallback(() => {
    setCurrentDate(new Date(year, month - 1, 1));
  }, [year, month]);

  // 切换到下一个月
  const goToNextMonth = useCallback(() => {
    setCurrentDate(new Date(year, month + 1, 1));
  }, [year, month]);

  // 切换到上一周
  const goToPrevWeek = useCallback(() => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
    setCurrentDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
  }, [selectedDate]);

  // 切换到下一周
  const goToNextWeek = useCallback(() => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
    setCurrentDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
  }, [selectedDate]);

  // 回到今天
  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  }, []);

  // 选择日期
  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // 获取某天的收支数据
  const getDayTransactions = useCallback(
    (day: number) => {
      const date = new Date(year, month, day);
      const dayStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      const allTransactions = transactionStore.getTransaction();
      const dayTransactions = allTransactions.filter((tx) => {
        const txDate = new Date(tx.createTime);
        const txDayStr = `${txDate.getFullYear()}-${String(txDate.getMonth() + 1).padStart(2, "0")}-${String(txDate.getDate()).padStart(2, "0")}`;
        return txDayStr === dayStr;
      });

      const income = dayTransactions
        .filter((tx) => tx.type === "income")
        .reduce((sum, tx) => sum + tx.amount, 0);
      const expense = dayTransactions
        .filter((tx) => tx.type === "expense")
        .reduce((sum, tx) => sum + tx.amount, 0);

      return { income, expense, transactions: dayTransactions };
    },
    [year, month, transactionStore],
  );

  // 获取选中日期的收支汇总
  const selectedDaySummary = useMemo(() => {
    const { income, expense } = getDayTransactions(selectedDate.getDate());
    return { income, expense, balance: income - expense };
  }, [getDayTransactions, selectedDate]);

  // 左右滑动处理
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          // 向左滑
          if (isCollapsed) {
            goToNextWeek();
          } else {
            goToNextMonth();
          }
        } else if (gestureState.dx > 50) {
          // 向右滑
          if (isCollapsed) {
            goToPrevWeek();
          } else {
            goToPrevMonth();
          }
        }
      },
    }),
  ).current;

  return (
    <LayoutComponent>
      <LayoutComponent.Header>
        <CalendarTabHeader
          year={year}
          month={month}
          selectedDate={selectedDate}
          selectedDaySummary={selectedDaySummary}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
          onPrevWeek={goToPrevWeek}
          onNextWeek={goToNextWeek}
          onToday={goToToday}
          isCollapsed={isCollapsed}
        />
      </LayoutComponent.Header>
      <LayoutComponent.Content>
        <View
          className="flex-1 bg-screenBackground"
          {...panResponder.panHandlers}
        >
          <CalendarContain
            currentDate={currentDate}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            isCollapsed={isCollapsed}
            onToggleCollapse={toggleCollapse}
            animatedHeight={animatedHeight}
            getDayTransactions={getDayTransactions}
          />
        </View>
      </LayoutComponent.Content>
    </LayoutComponent>
  );
}
