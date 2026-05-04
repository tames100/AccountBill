import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/theme";
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
  const textColor = "rgba(255, 255, 255, 0.7)"

  printLog(income.toString(), "income", expense.toString(), "expense")


  printLog(formatAmount(income))

  const mount: mountItem[] = [{
    label: "本月收入",
    icon: "arrow-up",
    amountTextColor: colors.incomeDark,
    amountValue: formatAmount(income ?? 0)
  }, {
    label: "本月支出",
    icon: "arrow-down",
    amountTextColor: colors.expenseDark,
    amountValue: formatAmount(expense ?? 0)
  }, {
    label: "本月结余",
    icon: "filter",
    amountTextColor: colors.balanceDark,
    amountValue: formatAmount(income - expense)
  }]


  return (
    <Card marginBottom={ 16 } backgroundColor={ colors.primary }>
      <View style={ {
        ...styles.info,
        marginBottom: 16,
      } }>
        {
          mount.map((item, index) => (
            <View style={ styles.infoItem } key={ index }>
              <View style={ styles.label }>
                <Icon name={ item.icon } size={ 16 } color={ textColor }/>
                <Text
                  style={ [
                    styles.infoText,
                    { color: textColor },
                  ] }
                >
                  { item.label }
                </Text>
              </View>
              <View>
                <Text style={ { ...styles.amount, color: item.amountTextColor } }>
                  { item.amountValue }
                </Text>
              </View>
            </View>
          ))
        }
      </View>
      <View style={ { ...styles.infoItem, justifyContent: "flex-start" } }>
        <View style={ styles.label }>
          <Icon name={ "arrow-up-circle" } size={ 16 } color={ textColor }/>
          <Text
            style={ [
              styles.infoText,
              { color: textColor },
            ] }
          >
            今年结余
          </Text>
        </View>
        <View>
          <Text style={ { ...styles.amount, color: colors.text } }>
            { formatAmount(income) }
          </Text>
        </View>
      </View>

    </Card>
  )
}

const styles = StyleSheet.create({
  label: {
    flexDirection: "row",
  },
  amount: {
    fontSize: 28,
    fontWeight: "500",
    lineHeight: 38,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  infoItem: {
    flexDirection: "column",
    gap: 6,
  },
  infoText: {
    fontSize: 12,
    fontWeight: "400",
  },
})


