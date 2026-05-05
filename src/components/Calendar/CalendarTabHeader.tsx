import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useTransactionStore } from "@/stores";
import { colors, fontSizes } from "@/constants/theme";
import { formatAmount } from "@/utils";
import { Icon } from "@/components/UI";

export default function CalendarTabHeader() {

  const transactionStore = useTransactionStore()

  return (
    <View style={ styles.header }>
      <View>
        <Text style={ styles.monthTitle }>2025年5月</Text>
        <View style={ styles.summaryRow }>
          <View style={ styles.summaryItem }>
            <Text style={ styles.summaryLabel }>收</Text>
            <Text style={ [styles.summaryValue, { color: colors.income }] }>
              { formatAmount(transactionStore.getTotalIncome()) }
            </Text>
          </View>
          <View style={ styles.summaryItem }>
            <Text style={ styles.summaryLabel }>支</Text>
            <Text style={ [styles.summaryValue, { color: colors.expense }] }>
              { formatAmount(transactionStore.getTotalExpense()) }
            </Text>
          </View>
          <View style={ styles.summaryItem }>
            <Text style={ styles.summaryLabel }>余</Text>
            <Text style={ [styles.summaryValue] }>
              { formatAmount(transactionStore.getTotalIncome() - transactionStore.getTotalExpense()) }
            </Text>
          </View>
        </View>
      </View>
      <View style={ styles.actions }>
        <Text style={ styles.actionsItem }>今</Text>
        <View style={ styles.actionsItem }>
          <Icon name={ "add-circle" } size={ 28 }/>
        </View>
        <TouchableOpacity activeOpacity={ 0.9 } style={ styles.actionsItem }>
          <Icon name={ "ellipsis-vertical" } size={ 28 }/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  monthTitle: {
    fontSize: fontSizes.largeBig,
    fontWeight: '600',
    color: colors.text,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: fontSizes.small,
    color: colors.text,
    marginRight: 4,
  },
  summaryValue: {
    fontSize: fontSizes.small,
    marginRight: 8,
  },
  actions: {
    flexDirection: "row",
  },
  actionsItem: {
    fontSize: fontSizes.largeBig,
    paddingHorizontal: 8,
  },
})
