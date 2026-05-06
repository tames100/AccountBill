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
  return (
    <>
      {data.map((item, index) => (
        <TransactionCard key={index} transaction={item} />
      ))}
    </>
  );
}

export default TransactionListCard;
