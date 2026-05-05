import React from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import { DayData } from "@/types";
import { CalendarCellWidth } from "@/constants/calendar";
import { fontSizes, colors } from "@/constants/theme";

interface CalendarGridItemProps {
  day: DayData | null;
  index: number;
  income: number;
  expenses: number;
}

/**
 * 组件介绍
 * @param props
 * @constructor
 */
export default function CalendarGridItem(props: CalendarGridItemProps) {
  const { day, index, income, expenses } = props;

  // 渲染每个日期格子
  if (!day) return (
    <View key={ index } style={ [styles.dayCell, styles.emptyCell] }/>
  );

  return (
    <View style={ [styles.dayCell, day.isToday && styles.todayCell] }>
      <Text style={ [styles.dayNumber, day.isToday && styles.todayText] }>{ day.date }</Text>
      <Text style={ styles.lunarText } numberOfLines={ 1 }>
        { day.lunarDay || '' }
      </Text>
      <View style={ styles.transactionContainer }>
        { day.transactions.map((tx, idx) => (
          <Text
            key={ idx }
            style={ [
              styles.transactionAmount,
              tx.amount >= 0 ? styles.incomeText : styles.expenseText,
            ] }
            numberOfLines={ 1 }
          >
            { tx.amount >= 0 ? `+${ tx.amount.toFixed(2) }` : `${ tx.amount.toFixed(2) }` }
          </Text>
        )) }
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
    dayCell: {
      width: CalendarCellWidth - 10,
      aspectRatio: 1 / 0.9,
      paddingVertical: 6,
      alignItems: 'center',
      borderRadius: 12,
    },
    emptyCell: {
      backgroundColor: 'transparent',
    },
    todayCell: {
      backgroundColor: colors.primary,
    },
    dayNumber: {
      fontSize: fontSizes.big,
      fontWeight: 500,
      color: '#333',
    },
    todayText: {
      color: colors.primaryText,
      fontWeight: 'bold',
    },
    lunarText: {
      fontSize: 10,
      color: colors.mutedText,
      marginTop: 2,
      textAlign: 'center',
    },
    transactionContainer: {
      marginTop: 4,
      alignItems: 'center',
    },
    transactionAmount: {
      fontSize: 11,
      fontWeight: '500',
    },
    incomeText: {
      color: colors.income,
    },
    expenseText: {
      color: colors.expense,
    },
    todayCard: {
      margin: 16,
      backgroundColor: '#f8fafc',
      borderRadius: 20,
      padding: 16,
      borderWidth: 1,
      borderColor: '#e2e8f0',
    },
    todayTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 12,
      color: '#1e293b',
    },
    todayStatsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statLabel: {
      fontSize: 13,
      color: '#64748b',
      marginBottom: 4,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    transactionsList: {
      margin: 16,
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
  }
)