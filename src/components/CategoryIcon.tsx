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
  const bgColor =
    type === "income" ? "rgba(76, 172, 144, 0.1)" : "rgba(250, 86, 84, 0.1)";

  return (
    <View
      className="items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bgColor,
      }}
    >
      <Text
        style={{
          fontSize: size * 0.7,
          color: type === "income" ? "#4cac90" : "#fa5654",
        }}
      >
        {icon}
      </Text>
    </View>
  );
}
