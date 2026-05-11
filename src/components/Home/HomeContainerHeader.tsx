import React from 'react';
import { Text, View } from 'react-native';
import { BalanceCard } from "@/components/Home/index";
import { Button } from "@/components/UI";
import { useRouter } from "expo-router";
import { pageRouter } from "@/config/router";

interface HomeContainerHeaderProps {
  income: number;
  expenses: number;
}

/**
 * 组件介绍
 * @param props
 * @constructor
 */
export default function HomeContainerHeader(props: HomeContainerHeaderProps) {
  const {income, expenses} = props;
  const router = useRouter();

  const handleClick = () => {
    router.push(pageRouter.noTabPage.addTransaction);
  }

  return (
    <View>
      <BalanceCard
        income={ income }
        expense={ expenses }/>
      <Button
        className={ "bg-primary" }
        onPress={ handleClick}
      >
        <Text className={ "text-xl color-white font-medium" }>添加一笔账单</Text>
      </Button>
    </View>
  );
}