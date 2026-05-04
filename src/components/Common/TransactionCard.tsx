import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CategoryIcon } from './CategoryIcon';
import { colors } from '@/constants/theme';
import {Transaction} from "@/types";
import {formatDate} from "@/utils";

interface TransactionCardProps {
  transaction: Transaction;
  onPress?: () => void;
}

export function TransactionCard({ transaction, onPress }: TransactionCardProps) {

  const categoryIcons: Record<string, string> = {
    餐饮: '☕',
    交通: '🚗',
    购物: '🛍️',
    居住: '🏠',
    娱乐: '🎮',
    工资: '💼',
    兼职: '💻',
    礼物: '🎁',
  };

  const icon = categoryIcons[transaction.categoryId] || '📦';
  const isIncome = transaction.type === 'income';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.card,
        {
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.08)',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 2,
        },
        styles.card,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.left}>
          <CategoryIcon name={icon} type={transaction.type} size={40} />
          <View style={styles.info}>
            <Text style={styles.category}>{transaction.categoryId}</Text>
            <Text style={styles.note}>{transaction.remark}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Text
            style={[
              styles.amount,
              {
                color: isIncome ? colors.income : colors.expense,
                fontSize: 18,
                fontWeight: '500',
              },
            ]}
          >
            {isIncome ? '+' : '-'}¥{transaction.amount.toLocaleString('zh-CN')}
          </Text>
          <Text style={styles.date}>{formatDate(transaction.updateTime)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  category: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  note: {
    fontSize: 13,
    color: '#717182',
    maxWidth: 200,
  },
  right: {
    alignItems: 'flex-end',
    gap: 4,
  },
  amount: {
    fontSize: 18,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#717182',
  },
});
