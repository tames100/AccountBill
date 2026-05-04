import { FlatList, StyleSheet } from "react-native";
import { TransactionCard } from "@/components/Common";
import { Transaction } from "@/types";


interface SummaryCardProps {
  data: Transaction[];
}

/**
 * 账单列表
 * @param data
 * @constructor
 */
function TransactionListCard({ data }: SummaryCardProps) {

  return (<>
      {
        data.map((item, index) => (
          <TransactionCard
            key={index}
          transaction={ item }
          />
        ))
      }
    </>
  )
}

const styles = StyleSheet.create({
  listContent: {
    gap: 8,
  },
})

export default TransactionListCard