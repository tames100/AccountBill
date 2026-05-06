import React, { useRef, useCallback, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import CalendarGrid from "@/components/Calendar/CalendarGrid";
import { useTransactionStore } from "@/stores";
import { Icon } from "@/components/UI";
import { tw } from "@/constants/theme";
import { formatAmount } from "@/utils";
import Value = Animated.Value;
import { Transaction } from "@/types/transaction";

// 日历折叠高度
const FULL_CALENDAR_HEIGHT = 360;
const COLLAPSED_CALENDAR_HEIGHT = 72;

interface CalendarContainProps {
  currentDate: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  // onMonthChange: (date: Date) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  animatedHeight: Value;
  getDayTransactions: (day: number) => {
    income: number;
    expense: number;
    transactions: Transaction[];
  };
}

export default function CalendarContain(props: CalendarContainProps) {
  const {
    currentDate,
    selectedDate,
    onDateSelect,
    animatedHeight: animatedHeightProps,
    isCollapsed,
    onToggleCollapse,
  } = props;

  const animatedHeight = useRef(animatedHeightProps).current;
  const transactionStore = useTransactionStore();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 切换折叠状态
  const toggleCollapse = useCallback(() => {
    const toValue = isCollapsed
      ? FULL_CALENDAR_HEIGHT
      : COLLAPSED_CALENDAR_HEIGHT;
    onToggleCollapse();
    Animated.spring(animatedHeight, {
      toValue,
      useNativeDriver: false,
      damping: 20,
      stiffness: 100,
    }).start();
  }, [isCollapsed, animatedHeight, onToggleCollapse]);

  // 获取某天的收支数据
  const getDayTransactions = useCallback(
    (day: number) => {
      const date = new Date(year, month, day);
      const dayStr = `${ date.getFullYear() }-${ String(date.getMonth() + 1).padStart(2, "0") }-${ String(day).padStart(2, "0") }`;

      const allTransactions = transactionStore.getTransaction();
      const dayTransactions = allTransactions.filter((tx) => {
        const txDate = new Date(tx.createTime);
        const txDayStr = `${ txDate.getFullYear() }-${ String(txDate.getMonth() + 1).padStart(2, "0") }-${ String(txDate.getDate()).padStart(2, "0") }`;
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

  // 获取选中日期的交易列表
  const selectedDayTransactions = useMemo(() => {
    const { transactions } = getDayTransactions(selectedDate.getDate());
    return transactions.sort((a, b) => {
      const timeA = new Date(a.createTime).getTime();
      const timeB = new Date(b.createTime).getTime();
      return timeB - timeA;
    });
  }, [getDayTransactions, selectedDate]);

  return (
    <Animated.View style={ { height: animatedHeight } }>
      <View className="bg-white rounded-3xl shadow-sm">
        {/* 日历网格 */ }
        <CalendarGrid
          currentDate={ currentDate }
          selectedDate={ selectedDate }
          onDateSelect={ onDateSelect }
          getDayTransactions={ getDayTransactions }
          isCollapsed={ false }/>

        {/* 折叠按钮 */ }
        <TouchableOpacity
          activeOpacity={ 0.8 }
          onPress={ toggleCollapse }
          className="items-center py-2 border-t border-border"
        >
          <Icon
            name={ isCollapsed ? "chevron-down" : "chevron-up" }
            size={ 16 }
            color={ tw.colors.mutedText }
          />
        </TouchableOpacity>

        {/* 选中日期信息 */ }
        { !isCollapsed && (
          <>
            <View className="flex-row justify-between items-center px-4 py-3 bg-white mt-2 mx-3 rounded-xl">
              <Text className="text-sm font-medium text-text">
                { selectedDate.getMonth() + 1 }月{ selectedDate.getDate() }日
              </Text>
              <View className="flex-row gap-3">
                <Text className="text-xs font-medium text-income">
                  收入:{ " " }
                  { formatAmount(
                    getDayTransactions(selectedDate.getDate()).income,
                  ) }
                </Text>
                <Text className="text-xs font-medium text-expense">
                  支出:{ " " }
                  { formatAmount(
                    getDayTransactions(selectedDate.getDate()).expense,
                  ) }
                </Text>
              </View>
            </View>

            {/* 交易列表 */ }
            <ScrollView className="flex-1 px-3 mt-2">
              { selectedDayTransactions.length === 0 ? (
                <View className="items-center justify-center py-12">
                  <Icon name="file-tray" size={ 32 } color={ tw.colors.text }/>
                  <Text className="text-sm text-mutedText mt-3">
                    暂无交易记录
                  </Text>
                </View>
              ) : (
                selectedDayTransactions.map((transaction) => (
                  <View
                    key={ transaction.id }
                    className="flex-row items-center justify-between bg-white rounded-xl p-3 mb-2"
                  >
                    <View className="flex-row items-center flex-1">
                      <View
                        className="w-10 h-10 rounded-full items-center justify-center"
                      >
                        <Icon
                          name={ "home" }
                          size={ 20 }
                        />
                      </View>
                      <View className="ml-3 flex-1">
                        <Text className="text-sm font-medium text-text">
                          { transaction.remark }
                        </Text>
                        <Text className="text-xs text-mutedText">
                          { transaction.amount }
                        </Text>
                      </View>
                    </View>
                    <Text
                      className={ `text-sm font-medium ${
                        transaction.type === "income"
                          ? "text-income"
                          : "text-expense"
                      }` }
                    >
                      { transaction.type === "income" ? "+" : "-" }
                      { formatAmount(transaction.amount) }
                    </Text>
                  </View>
                ))
              ) }
            </ScrollView>
          </>
        ) }
      </View>
    </Animated.View>
  );
}
