import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

interface CategoryIconProps {
  name: string;
  type: 'income' | 'expense';
  size?: number;
}

const categoryIcons: Record<string, string> = {
  bakery: '🍞',
  utensils: '🍽️',
  chefHat: '👨‍🍳',
  candy: '🍬',
  bus: '🚌',
  trainTrack: '🛤️',
  taxi: '🚕',
  tshirt: '👕',
  shoppingCart: '🛒',
  building: '🏢',
  plug: '🔌',
  film: '🎬',
  plane: '✈️',
  briefcase: '💼',
  trophy: '🏆',
  laptop: '💻',
  hammer: '🔨',
  activity: '📊',
  pieChart: '🥧',
  moreHorizontal: '⋯',
  gamepad2: '🎮',
  heartPulse: '❤️',
  bookOpen: '📚',
  shoppingBag: '🛍️',
  home: '🏠',
  train: '🚂',
  airplane: '✈️',
  car: '🚗',
  bicycle: '🚲',
  wallet: '👛',
  creditCard: '💳',
  smartphone: '📱',
  landmark: '🏦',
  TrendingUp: '📈',
  TrendingDown: '📉',
  Plus: '➕',
  Wallet: '👛',
  Calendar: '📅',
  MoreHorizontal: '⋯',
  Coffee: '☕',
  Heart: '❤️',
  Briefcase: '💼',
  Gift: '🎁',
};

export function CategoryIcon({ name, type, size = 24 }: CategoryIconProps) {
  const icon = categoryIcons[name] || '📦';
  const color = type === 'income' ? colors.income : colors.expense;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: `${color}15`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: size * 0.7, color }}>{icon}</Text>
    </View>
  );
}
