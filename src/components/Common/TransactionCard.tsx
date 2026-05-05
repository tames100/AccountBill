import { Card } from "@/components/UI";
import { Transaction } from "@/types/index";
import { formatAmount, formatDate } from "@/utils";
import { Text, View } from "react-native";
import { CategoryIcon } from "../CategoryIcon";

interface TransactionCardProps {
  transaction: Transaction;
  onPress?: () => void;
}

export function TransactionCard({
  transaction,
  onPress,
}: TransactionCardProps) {
  const categoryIcons: Record<string, string> = {
    餐饮: "☕",
    交通: "🚗",
    购物: "🛍️",
    居住: "🏠",
    娱乐: "🎮",
    工资: "💼",
    兼职: "💻",
    礼物: "🎁",
  };

  const icon = categoryIcons[transaction.categoryId] || "📦";
  const isIncome = transaction.type === "income";

  return (
    <Card
      marginBottom={5}
      marginTop={0}
      borderRadius={16}
      backgroundColor="white"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1 gap-3">
          <CategoryIcon name={icon} type={transaction.type} size={40} />
          <View className="flex-1 gap-1">
            <Text className="text-base font-medium text-black">
              {transaction.categoryId}
            </Text>
            <Text className="text-sm text-mutedText max-w-[200px]">
              {transaction.remark}
            </Text>
          </View>
        </View>
        <View className="items-end gap-1">
          <Text
            className={`text-lg font-medium ${isIncome ? "text-income" : "text-expense"}`}
          >
            {isIncome ? "+" : "-"}
            {formatAmount(transaction.amount)}
          </Text>
          <Text className="text-xs text-mutedText">
            {formatDate(transaction.updateTime)}
          </Text>
        </View>
      </View>
    </Card>
  );
}

// 样式已迁移到nativeWind类名
