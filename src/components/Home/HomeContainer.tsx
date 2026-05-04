import React from 'react';
import { BalanceCard, TransactionListCard } from "@/components/Home/index";
import { useTransactionStore } from "@/stores";
import { StyleSheet } from "react-native";
import { DraggableY } from "@/components/UI";

export default function HomeContainer() {

  const transactionStore = useTransactionStore();

  return (<>
      <DraggableY style={ styles.draggableBox }>
        <BalanceCard
          income={ transactionStore.getTotalIncome() }
          expense={ transactionStore.getTotalExpense() }
        />
        <TransactionListCard data={ transactionStore.getTransaction() }/>
      </DraggableY>
    </>
  );
}

const styles = StyleSheet.create({
  draggableBox: {
    width: "100%",
    borderRadius: 5,
  }
})