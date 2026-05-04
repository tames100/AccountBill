import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import CalendarGrid from "@/components/Calendar/CalendarGrid";
import { useTransactionStore } from "@/stores";
import CalendarTabHeader from "@/components/Calendar/CalendarTabHeader";

interface CalendarContainProps {
}

/**
 * 组件介绍
 * @param props
 * @constructor
 */
export default function CalendarContain(props: CalendarContainProps) {
  const {} = props;
  const transactionStore = useTransactionStore();
// 交易记录
  const recentTransactions = [
    {
      time: '10:54',
      type: '余额宝',
      desc: '收入-活动奖励',
      location: '学府大道成都文理学院(金堂校区)',
      amount: 0.07,
    }, {
      time: '10:54',
      type: '余额宝',
      desc: '收入-活动奖励',
      location: '学府大道成都文理学院(金堂校区)',
      amount: 0.07,
    }, {
      time: '10:54',
      type: '余额宝',
      desc: '收入-活动奖励',
      location: '学府大道成都文理学院(金堂校区)',
      amount: 0.07,
    }, {
      time: '10:54',
      type: '余额宝',
      desc: '收入-活动奖励',
      location: '学府大道成都文理学院(金堂校区)',
      amount: 0.07,
    }, {
      time: '10:54',
      type: '余额宝',
      desc: '收入-活动奖励',
      location: '学府大道成都文理学院(金堂校区)',
      amount: 0.07,
    }, {
      time: '10:54',
      type: '余额宝',
      desc: '收入-活动奖励',
      location: '学府大道成都文理学院(金堂校区)',
      amount: 0.07,
    }, {
      time: '10:54',
      type: '余额宝',
      desc: '收入-活动奖励',
      location: '学府大道成都文理学院(金堂校区)',
      amount: 0.07,
    },
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={ false }>
      {/* 日历网格 */ }
      <CalendarGrid/>

      {/* 今日数据卡片 */ }
      <View style={ styles.todayCard }>
        <Text style={ styles.todayTitle }>今天 · 青年节</Text>
        <View style={ styles.todayStatsRow }>
          <View style={ styles.statItem }>
            <Text style={ styles.statLabel }>收</Text>
            <Text style={ [styles.statValue, styles.incomeText] }>
              { transactionStore.getTotalIncome() }
            </Text>
          </View>
          <View style={ styles.statItem }>
            <Text style={ styles.statLabel }>支</Text>
            <Text style={ [styles.statValue, styles.expenseText] }>
              { transactionStore.getTotalExpense() }
            </Text>
          </View>
          <View style={ styles.statItem }>
            <Text style={ styles.statLabel }>余</Text>
            <Text
              style={ [
                styles.statValue,
                transactionStore.getBalance() >= 0 ? styles.incomeText : styles.expenseText,
              ] }
            >
              { transactionStore.getBalance() }
            </Text>
          </View>
        </View>
      </View>

      {/* 交易记录列表 */ }
      <View style={ styles.transactionsList }>
        <Text style={ styles.listHeader }>淘宝活动提现</Text>
        { transactionStore.getTransaction().map(( item, idx ) => (
          <View key={ idx } style={ styles.transactionItem }>
            <Text style={ styles.txTime }>{ item.updateTime.getDate() }</Text>
            <View style={ styles.txDetails }>
              <Text style={ styles.txType }>{ item.type }</Text>
              <Text style={ styles.txDesc }>{ item.remark }</Text>
              <Text style={ styles.txLocation }>{ item.type }</Text>
            </View>
            <Text style={ [styles.txAmount, styles.incomeText] }>+{ item.amount.toFixed(2) }</Text>
          </View>
        )) }
      </View>
    </ScrollView>
  );
}

// ==================== 样式定义 ====================
const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: '#667eea',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  calendarHeader: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    color: '#1e293b',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  calendarGrid: {
    paddingHorizontal: 8,
  },
  emptyCell: {
    backgroundColor: 'transparent',
  },
  todayCell: {
    backgroundColor: '#eef2ff',
    borderWidth: 1,
    borderColor: '#667eea',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  todayText: {
    color: '#667eea',
    fontWeight: 'bold',
  },
  lunarText: {
    fontSize: 10,
    color: '#999',
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
    color: '#10b981',
  },
  expenseText: {
    color: '#ef4444',
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
  listHeader: {
    fontSize: 15,
    fontWeight: '600',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eef2f6',
    marginBottom: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  txTime: {
    fontSize: 13,
    color: '#94a3b8',
    minWidth: 50,
  },
  txDetails: {
    flex: 1,
  },
  txType: {
    fontWeight: '600',
    fontSize: 14,
  },
  txDesc: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  txLocation: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  txAmount: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#edf2f7',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  activeNavText: {
    color: '#667eea',
    fontWeight: '600',
  },
});