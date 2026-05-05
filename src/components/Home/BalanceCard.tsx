import { Text, View } from "react-native";
import { Icon, Card } from "@/components/UI";
import { formatAmount } from "@/utils";
import { printLog } from "@/utils/printLog";
import { IconName } from "@/types/icon";

interface BalanceCardProps {
  income: number;
  expense: number;
}

interface mountItem {
  label: string;
  icon: IconName;
  amountTextColor: string;
  amountValue: string;
}

export default function BalanceCard({ income, expense }: BalanceCardProps) {
  const textColor = "rgba(255, 255, 255, 0.7)";

  printLog(income.toString(), "income", expense.toString(), "expense");

  printLog(formatAmount(income));

  const mount: mountItem[] = [
    {
      label: "本月收入",
      icon: "arrow-up",
      amountTextColor: colors.incomeDark,
      amountValue: formatAmount(income ?? 0),
    },
    {
      label: "本月支出",
      icon: "arrow-down",
      amountTextColor: colors.expenseDark,
      amountValue: formatAmount(expense ?? 0),
    },
    {
      label: "本月结余",
      icon: "filter",
      amountTextColor: colors.balanceDark,
      amountValue: formatAmount(income - expense),
    },
  ];

  return (
    <Card marginBottom={16} backgroundColor="primary">
      <View className="flex-row items-center gap-6 mb-4">
        {mount.map((item, index) => (
          <View className="flex-col gap-1.5" key={index}>
            <View className="flex-row">
              <Icon name={item.icon} size={16} color={textColor} />
              <Text
                className="text-xs font-normal"
                style={{ color: textColor }}
              >
                {item.label}
              </Text>
            </View>
            <View>
              <Text
                className="text-2xl font-medium leading-9"
                style={{ color: item.amountTextColor }}
              >
                {item.amountValue}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View className="flex-col gap-1.5 justify-start">
        <View className="flex-row">
          <Icon name={"arrow-up-circle"} size={16} color={textColor} />
          <Text className="text-xs font-normal" style={{ color: textColor }}>
            今年结余
          </Text>
        </View>
        <View>
          <Text className="text-2xl font-medium leading-9 text-text">
            {formatAmount(income)}
          </Text>
        </View>
      </View>
    </Card>
  );
}

// 样式已迁移到nativeWind类名
