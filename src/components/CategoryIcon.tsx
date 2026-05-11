import { View, Text } from "react-native";
import { tw } from "@/constants/theme";
import { TransactionType } from "@/types/transaction";

interface CategoryIconProps {
  name: string;
  type: TransactionType;
  size?: number;
}

const categoryIcons: Record<string, string> = {
  bakery: "🍞",
  utensils: "🍽️",
  chefHat: "👨‍🍳",
  candy: "🍬",
  bus: "🚌",
  trainTrack: "🛤️",
  taxi: "🚕",
  tshirt: "👕",
  shoppingCart: "🛒",
  building: "🏢",
  plug: "🔌",
  film: "🎬",
  plane: "✈️",
  briefcase: "💼",
  trophy: "🏆",
  laptop: "💻",
  hammer: "🔨",
  activity: "📊",
  pieChart: "🥧",
  moreHorizontal: "⋯",
  gamepad2: "🎮",
  heartPulse: "❤️",
  bookOpen: "📚",
  shoppingBag: "🛍️",
  home: "🏠",
  train: "🚂",
  airplane: "✈️",
  car: "🚗",
  bicycle: "🚲",
  wallet: "👛",
  creditCard: "💳",
  smartphone: "📱",
  landmark: "🏦",
  TrendingUp: "📈",
  TrendingDown: "📉",
  Plus: "➕",
  Wallet: "👛",
  Calendar: "📅",
  MoreHorizontal: "⋯",
  Coffee: "☕",
  Heart: "❤️",
  Briefcase: "💼",
  Gift: "🎁",
};

export function CategoryIcon({ name, type, size = 24 }: CategoryIconProps) {
  const icon = categoryIcons[name] || "📦";

  return (
    <View className={ `items-center justify-center size-[${ size }] rounded-full` }>
      <Text className="text-2xl">
        { icon }
      </Text>
    </View>
  );
}
