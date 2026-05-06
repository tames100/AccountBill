import { Card, Icon } from "@/components/UI";
import { Text, View } from "react-native";

interface SummaryCardProps {
  title: string;
  type: "income" | "expense";
  total: number;
}

function SummaryCard({ title, type, total }: SummaryCardProps) {
  return (
    <Card>
      <View className="w-8 h-8 rounded-full bg-income/10 items-center justify-center mb-2">
        {type === "income" ? (
          <Icon name={"arrow-up"} size={16} />
        ) : (
          <Icon name={"arrow-down"} size={16} />
        )}
      </View>
      <Text className="text-sm text-mutedText mb-2">{title}</Text>
      <Text className="text-2xl font-medium text-text leading-7">
        ¥{total.toLocaleString("zh-CN")}
      </Text>
    </Card>
  );
}

export default SummaryCard;
