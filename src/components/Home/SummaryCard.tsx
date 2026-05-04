import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/theme";
import { Card, Icon } from "@/components/UI";

interface SummaryCardProps {
  title: string;
  type: "income" | "expense";
  total: number;
}

function SummaryCard({ title, type, total }: SummaryCardProps) {

  return (
      <Card>
        <View style={ styles.summaryIcon }>
          { type === "income" ? <Icon name={"arrow-up"} size={ 16 } color={ colors.income }/> :
            <Icon name={"arrow-down"} size={ 16 } color={ colors.expense }/> }

        </View>
        <Text style={ styles.summaryLabel }>{ title }</Text>
        <Text style={ [styles.summaryAmount, { color: colors.text }] }>
          ¥{ total.toLocaleString("zh-CN") }
        </Text>
      </Card>
  )
}

const styles = StyleSheet.create({
  // summaryCard: {
  //   flex: 1,
  //   backgroundColor: colors.card,
  //   borderRadius: 16,
  //   padding: 16,
  //   borderWidth: 1,
  //   borderColor: "rgba(0, 0, 0, 0.08)",
  //   alignItems: "center",
  // },
  summaryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${ colors.income }15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.mutedText,
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: "500",
    lineHeight: 28,
  },
})

export default SummaryCard;