import { Card } from "@/components/UI";
import { Transaction } from "@/types/index";
import { formatAmount, formatDateTime } from "@/utils";
import { Text, View } from "react-native";
import { CategoryIcon } from "@/components";

interface TransactionCardProps {
  transaction: Transaction;
  onPress?: () => void;
}

export function TransactionCard({
                                  transaction,
                                  onPress,
                                }: TransactionCardProps) {
  const isIncome = transaction.type === "income";

  return (
    <Card className={ "mb-2" } isBorder={true}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-start flex-1 gap-3">
          <CategoryIcon name={ transaction.categoryId } type={ transaction.type } size={ 40 }/>
          <View className="flex-1 gap-1">
            <Text className="text-xl font-medium text-black-100">
              { transaction.categoryId }
            </Text>
            { transaction.remark && (<Text className="text-sm text-mutedText max-w-[200px]">
              { transaction.remark }
            </Text>) }
            {
              transaction.local && (
                <Text className="text-sm text-mutedText max-w-[200px]">
                  { transaction.local }
                </Text>
              )
            }
          </View>
        </View>
        <View className="items-end gap-1">
          <Text
            className={ `text-lg font-medium ${ isIncome ? "text-income" : "text-expense" }` }
          >
            { isIncome ? "+" : "-" }
            { formatAmount(transaction.amount) }
          </Text>
          <Text className="text-xs text-mutedText">
            { formatDateTime(transaction.updateTime) }
          </Text>
        </View>
      </View>
    </Card>
  );
}
