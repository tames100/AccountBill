import React from 'react';
import { BalanceCard } from "@/components/Home/index";
import { useTransactionStore } from "@/stores";
import { FlatList, Text, View, } from "react-native";
import { TransactionCard } from "@/components/Common";
import { Button, EmptyState } from "@/components/UI/";
import HomeContainerHeader from "@/components/Home/HomeContainerHeader";

export default function HomeContainer() {

  const transactionStore = useTransactionStore();

  return (
    <FlatList
      showsVerticalScrollIndicator={ false }
      data={ transactionStore.getTransaction() }
      keyExtractor={ (_, index) => index.toString() }
      renderItem={ ({ item, index }) => (
        <TransactionCard transaction={ item }/>
      ) }
      ListHeaderComponent={ (
        <HomeContainerHeader income={transactionStore.getTotalIncome()} expenses={transactionStore.getTotalExpense()}/>
      ) }
      ListEmptyComponent={
        <EmptyState icon={ 'Home' } title={ "暂时没有账单" } description={ "" }/>
      }
      className={ "relative" }
    />
  );
}