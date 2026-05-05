import { View, Text } from "react-native";

interface CategoryIconProps {
  name: string;
  type: "income" | "expense";
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
  const colorClass = type === "income" ? "text-income" : "text-expense";
  const bgColorClass = type === "income" ? "bg-income/10" : "bg-expense/10";

  return (
    <View
      className={`
        ${bgColorClass}
        items-center justify-center
      `}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
    >
      <Text
        className={colorClass}
        style={{
          fontSize: size * 0.7,
        }}
      >
        {icon}
      </Text>
    </View>
  );
}
