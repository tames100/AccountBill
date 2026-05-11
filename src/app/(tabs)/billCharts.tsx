import { Card, Icon } from "@/components/UI";
import { tw } from "@/constants/theme";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BarChartUI,
  ContributionGraphUI,
  LineChartUI,
  PieChartUI, ProgressBarUI,
  ProgressChartUI, ProgressCircleUI, ProgressPeiUI
} from "@/components/UI/Charts";
import { LayoutComponent } from "@/components/Common";
import { formatAmount } from "@/utils";
import BarChart from "@/components/UI/Charts/BarChart";

export default function BillCharts() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const totalIncome = 5500;
  const totalExpense = 262;
  const balance = totalIncome - totalExpense;

  const categoryData = [
    { name: "餐饮", amount: 45, percent: 17, color: tw.colors.expense },
    { name: "交通", amount: 128, percent: 49, color: "#FF9800" },
    { name: "购物", amount: 89, percent: 34, color: "#9aaa83" },
  ];

  const dailyData = [
    { day: "1日", income: 5200, expense: 0 },
    { day: "10日", income: 300, expense: 0 },
    { day: "11日", income: 0, expense: 89 },
    { day: "12日", income: 0, expense: 128 },
    { day: "13日", income: 0, expense: 45 },
  ];

  return (
    <LayoutComponent>
      <LayoutComponent.Header>
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity
            className="w-9 h-9 rounded-full border border-border items-center justify-center"
            onPress={ handlePrevMonth }
          >
            <Icon name={ "arrow-back-sharp" } size={ 20 }/>
          </TouchableOpacity>
          <Text className="text-xl font-medium text-text">
            { year }年{ month }月
          </Text>
          <TouchableOpacity
            className="w-9 h-9 rounded-full border border-border items-center justify-center"
            onPress={ handleNextMonth }
          >
            <Icon name={ "arrow-forward-sharp" } size={ 20 }/>
          </TouchableOpacity>
        </View>
      </LayoutComponent.Header>
      <LayoutComponent.Content>
        <ScrollView
          showsVerticalScrollIndicator={ false }
        >
          <View className="flex-1 px-5 pb-25">

            <View className="rounded-3xl p-6 mb-4 bg-primary">
              <Text className="text-sm font-normal text-white/70">本月结余</Text>
              <Text className="text-5xl font-medium color-balance mb-4 leading-10">
                ¥{ formatAmount(balance) }
              </Text>
              <View className="flex-row gap-4">
                <View className="flex-1">
                  <Text className="text-xs font-normal text-white/70">收入</Text>
                  <Text className="text-xl font-medium color-income-dark">
                    ¥{ formatAmount(totalIncome) }
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xs font-normal text-white/70">支出</Text>
                  <Text className="text-xl font-medium color-expense-dark">
                    ¥{ formatAmount(totalExpense) }
                  </Text>
                </View>
              </View>
            </View>

            <Card>
              <BarChartUI/>
            </Card>
            <Card>
              <BarChart />
            </Card>

            <Card className="bg-white p-5 mb-4">
              <Text className="text-base font-medium text-text mb-4">每日趋势</Text>
              <View className="flex-row justify-between items-end h-24">
                { dailyData.map((item, index) => (
                  <View key={ index } className="items-center flex-1">
                    <Text className="text-xs text-mutedText mb-2">{ item.day }</Text>
                    <View className="flex-row items-end gap-1 h-20">
                      <View
                        className="flex-1 bg-income rounded-t-lg"
                        style={ { height: (item.income / 6000) * 100 } }
                      />
                      <View
                        className="flex-1 bg-expense rounded-t-lg"
                        style={ { height: (item.expense / 6000) * 100 } }
                      />
                    </View>
                  </View>
                )) }
              </View>
              <View className="flex-row justify-center gap-6 mt-4">
                <View className="flex-row items-center gap-2">
                  <View className="w-3 h-3 bg-income rounded-full"/>
                  <Text className="text-xs text-mutedText">收入</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <View className="w-3 h-3 bg-expense rounded-full"/>
                  <Text className="text-xs text-mutedText">支出</Text>
                </View>
              </View>
            </Card>

            <Card>
              <LineChartUI/>
            </Card>
            <Card>
              <ProgressChartUI/>
            </Card>
            <Card>
              <PieChartUI/>
            </Card>
            <Card>
              <ContributionGraphUI/>
            </Card>
            <Card>
              <ProgressPeiUI/>
            </Card>
            <Card>
              <ProgressCircleUI/>
            </Card>
            <Card>
              <ProgressBarUI/>
            </Card>

            <View className="bg-white rounded-2xl p-5 border border-border">
              <Text className="text-base font-medium text-text mb-4">支出分类</Text>
              { categoryData.map((category) => (
                <View key={ category.name } className="mb-4">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm font-medium text-text">
                      { category.name }
                    </Text>
                    <View className="flex-row items-center gap-3">
                      <Text className="text-xs font-medium text-mutedText">
                        { category.percent }%
                      </Text>
                      <Text className="text-xs font-normal text-mutedText">
                        ¥{ category.amount }
                      </Text>
                    </View>
                  </View>
                  <View className="w-full h-2 bg-muted rounded-full">
                    <View
                      className="h-full rounded-full"
                      style={ {
                        width: `${ category.percent }%`,
                        backgroundColor: category.color,
                      } }
                    />
                  </View>
                </View>
              )) }
            </View>
          </View>
        </ScrollView>
      </LayoutComponent.Content>
    </LayoutComponent>
  );
}
