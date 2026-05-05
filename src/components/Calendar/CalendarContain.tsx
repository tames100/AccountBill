import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
} from "react-native";
import CalendarGrid from "@/components/Calendar/CalendarGrid";
import { useTransactionStore } from "@/stores";
import { Icon } from "@/components/UI";
import { colors } from "@/constants/theme";
import { formatAmount } from "@/utils";
import { useLunarInfo } from "@/hooks/useLunarInfo";

// 日历折叠高度
const FULL_CALENDAR_HEIGHT = 360;
const COLLAPSED_CALENDAR_HEIGHT = 72;

interface CalendarContainProps {
  currentDate: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function CalendarContain(props: CalendarContainProps) {
  const {
    currentDate,
    selectedDate,
    onDateSelect,
    onMonthChange,
    isCollapsed,
    onToggleCollapse,
  } = props;

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

  // 获取选中日期的交易列表
  const selectedDayTransactions = useMemo(() => {
    const { transactions } = getDayTransactions(selectedDate.getDate());
    return transactions.sort((a, b) => {
      const timeA = new Date(a.createTime).getTime();
      const timeB = new Date(b.createTime).getTime();
      return timeB - timeA;
    });
  }, [getDayTransactions, selectedDate]);

  // 获取选中日期的收支汇总
  const selectedDaySummary = useMemo(() => {
    const { income, expense } = getDayTransactions(selectedDate.getDate());
    return { income, expense, balance: income - expense };
  }, [getDayTransactions, selectedDate]);

  // 获取选中日期的农历
  const selectedLunarInfo = useMemo(() => {
    const { lunarDay, festival } = useLunarInfo(selectedDate);
    return { lunarDay, festival };
  }, [selectedDate]);

  // 左右滑动处理
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          // 向左滑 - 触发父组件的切换逻辑
        } else if (gestureState.dx > 50) {
          // 向右滑 - 触发父组件的切换逻辑
        }
      },
    }),
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* 日历区域 */}
      <Animated.View
        style={[styles.calendarContainer, { height: animatedHeight }]}
      >
        <CalendarGrid
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          isCollapsed={isCollapsed}
          getDayTransactions={getDayTransactions}
        />

        {/* 折叠/展开按钮 */}
        <TouchableOpacity
          style={styles.collapseButton}
          onPress={toggleCollapse}
          activeOpacity={0.7}
        >
          <Icon
            name={isCollapsed ? "chevron-down-outline" : "chevron-up-outline"}
            size={20}
            color={colors.mutedText}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* 选中日期信息 */}
      <View style={styles.selectedDateInfo}>
        <Text style={styles.selectedDateText}>
          今天 {selectedLunarInfo.festival || selectedLunarInfo.lunarDay || ""}
        </Text>
        <View style={styles.selectedDateSummary}>
          <Text style={[styles.selectedDateAmount, { color: colors.income }]}>
            收 {formatAmount(selectedDaySummary.income)}
          </Text>
          <Text style={[styles.selectedDateAmount, { color: colors.expense }]}>
            支 {formatAmount(selectedDaySummary.expense)}
          </Text>
          <Text
            style={[
              styles.selectedDateAmount,
              {
                color:
                  selectedDaySummary.balance >= 0
                    ? colors.income
                    : colors.expense,
              },
            ]}
          >
            余 {formatAmount(selectedDaySummary.balance)}
          </Text>
        </View>
      </View>

      {/* 交易记录列表 */}
      <ScrollView
        style={styles.transactionList}
        showsVerticalScrollIndicator={false}
      >
        {selectedDayTransactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="receipt-outline" size={48} color={colors.muted} />
            <Text style={styles.emptyText}>暂无账单记录</Text>
          </View>
        ) : (
          selectedDayTransactions.map((tx, idx) => (
            <TouchableOpacity key={idx} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={styles.transactionIcon}>
                  <Icon
                    name={
                      tx.type === "income"
                        ? "arrow-down-circle-outline"
                        : "arrow-up-circle-outline"
                    }
                    size={24}
                    color={
                      tx.type === "income" ? colors.income : colors.expense
                    }
                  />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>
                    {tx.remark || tx.categoryId}
                  </Text>
                  <Text style={styles.transactionTime}>
                    {new Date(tx.createTime).toLocaleTimeString("zh-CN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                  {tx.account && (
                    <Text style={styles.transactionAccount}>{tx.account}</Text>
                  )}
                </View>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  {
                    color:
                      tx.type === "income" ? colors.income : colors.expense,
                  },
                ]}
              >
                {tx.type === "income" ? "+" : "-"}
                {formatAmount(tx.amount)}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

// ==================== 样式定义 ====================
const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: "#667eea",
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  calendarHeader: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
    color: "#1e293b",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  calendarGrid: {
    paddingHorizontal: 8,
  },
  emptyCell: {
    backgroundColor: "transparent",
  },
  todayCell: {
    backgroundColor: "#eef2ff",
    borderWidth: 1,
    borderColor: "#667eea",
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  todayText: {
    color: "#667eea",
    fontWeight: "bold",
  },
  lunarText: {
    fontSize: 10,
    color: "#999",
    marginTop: 2,
    textAlign: "center",
  },
  transactionContainer: {
    marginTop: 4,
    alignItems: "center",
  },
  transactionAmount: {
    fontSize: 11,
    fontWeight: "500",
  },
  incomeText: {
    color: "#10b981",
  },
  expenseText: {
    color: "#ef4444",
  },
  todayCard: {
    margin: 16,
    backgroundColor: "#f8fafc",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  todayTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1e293b",
  },
  todayStatsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  transactionsList: {
    margin: 16,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  listHeader: {
    fontSize: 15,
    fontWeight: "600",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eef2f6",
    marginBottom: 12,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  txTime: {
    fontSize: 13,
    color: "#94a3b8",
    minWidth: 50,
  },
  txDetails: {
    flex: 1,
  },
  txType: {
    fontWeight: "600",
    fontSize: 14,
  },
  txDesc: {
    fontSize: 12,
    color: "#475569",
    marginTop: 2,
  },
  txLocation: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 2,
  },
  txAmount: {
    fontWeight: "bold",
    fontSize: 15,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingBottom: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#edf2f7",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 14,
    color: "#94a3b8",
  },
  activeNavText: {
    color: "#667eea",
    fontWeight: "600",
  },
});
