import { colors } from "@/constants/theme";
import { useState } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@/components/UI";

const { width } = Dimensions.get("window");

export default function BillCharts() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

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
    { name: "餐饮", amount: 45, percent: 17, color: colors.expense },
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
    <SafeAreaView style={ styles.container } edges={ ["top"] }>
      <View style={ styles.header }>
        <Text style={ styles.title }>账单</Text>
      </View>

      <View style={ styles.content }>
        <View style={ styles.monthSelector }>
          <TouchableOpacity
            style={ styles.monthButton }
            onPress={ handlePrevMonth }
          >
            <Icon name={"hand-left"} size={20} color={ colors.text } />
          </TouchableOpacity>
          <Text style={ styles.monthText }>
            { year }年{ month + 1 }月
          </Text>
          <TouchableOpacity
            style={ styles.monthButton }
            onPress={ handleNextMonth }
          >
            <Icon name={"hand-right"} size={20} color={ colors.text } />
          </TouchableOpacity>
        </View>

        <View style={ [styles.summaryCard, { backgroundColor: colors.primary }] }>
          <Text
            style={ [styles.summaryLabel, { color: "rgba(255, 255, 255, 0.7)" }] }
          >
            本月结余
          </Text>
          <Text style={ styles.summaryAmount }>
            ¥{ balance.toLocaleString("zh-CN") }
          </Text>
          <View style={ styles.summaryGrid }>
            <View style={ styles.summaryItem }>
              <Text
                style={ [
                  styles.summaryItemLabel,
                  { color: "rgba(255, 255, 255, 0.7)" },
                ] }
              >
                收入
              </Text>
              <Text style={ [styles.summaryItemAmount, { color: "#ffffff" }] }>
                ¥{ totalIncome.toLocaleString("zh-CN") }
              </Text>
            </View>
            <View style={ styles.summaryItem }>
              <Text
                style={ [
                  styles.summaryItemLabel,
                  { color: "rgba(255, 255, 255, 0.7)" },
                ] }
              >
                支出
              </Text>
              <Text style={ [styles.summaryItemAmount, { color: "#ffffff" }] }>
                ¥{ totalExpense.toLocaleString("zh-CN") }
              </Text>
            </View>
          </View>
        </View>

        <View style={ styles.chartCard }>
          <Text style={ styles.chartTitle }>每日趋势</Text>
          <View style={ styles.chart }>
            { dailyData.map((item, index) => (
              <View key={ index } style={ styles.chartItem }>
                <Text style={ styles.chartDay }>{ item.day }</Text>
                <View style={ styles.chartBars }>
                  <View
                    style={ [
                      styles.chartBar,
                      {
                        height: (item.income / 6000) * 100,
                        backgroundColor: colors.income,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      },
                    ] }
                  />
                  <View
                    style={ [
                      styles.chartBar,
                      {
                        height: (item.expense / 6000) * 100,
                        backgroundColor: colors.expense,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      },
                    ] }
                  />
                </View>
              </View>
            )) }
          </View>
          <View style={ styles.chartLegend }>
            <View style={ styles.legendItem }>
              <View
                style={ [styles.legendDot, { backgroundColor: colors.income }] }
              />
              <Text style={ styles.legendText }>收入</Text>
            </View>
            <View style={ styles.legendItem }>
              <View
                style={ [styles.legendDot, { backgroundColor: colors.expense }] }
              />
              <Text style={ styles.legendText }>支出</Text>
            </View>
          </View>
        </View>

        <View style={ styles.categoryCard }>
          <Text style={ styles.categoryTitle }>支出分类</Text>
          { categoryData.map((category) => (
            <View key={ category.name } style={ styles.categoryItem }>
              <View style={ styles.categoryInfo }>
                <Text style={ styles.categoryName }>{ category.name }</Text>
                <View style={ styles.categoryPercent }>
                  <Text style={ styles.categoryPercentText }>
                    { category.percent }%
                  </Text>
                  <Text style={ styles.categoryAmount }>¥{ category.amount }</Text>
                </View>
              </View>
              <View style={ styles.progressBar }>
                <View
                  style={ [
                    styles.progressFill,
                    {
                      width: `${ category.percent }%`,
                      backgroundColor: category.color,
                    },
                  ] }
                />
              </View>
            </View>
          )) }
        </View>
      </View>
      {/*
      <BottomNavigation /> */ }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  monthButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    // backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  monthText: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.text,
  },
  summaryCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 42,
    fontWeight: "500",
    color: "#ffffff",
    marginBottom: 16,
    lineHeight: 42,
  },
  summaryGrid: {
    flexDirection: "row",
    gap: 16,
  },
  summaryItem: {
    flex: 1,
  },
  summaryItemLabel: {
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 4,
  },
  summaryItemAmount: {
    fontSize: 20,
    fontWeight: "500",
  },
  chartCard: {
    // backgroundColor: colors.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 16,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 192,
    gap: 16,
  },
  chartItem: {
    flex: 1,
    alignItems: "center",
  },
  chartDay: {
    fontSize: 12,
    color: colors.mutedText,
    marginBottom: 8,
  },
  chartBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
    width: "100%",
  },
  chartBar: {
    flex: 1,
    width: 12,
    backgroundColor: colors.income,
    borderRadius: 8,
  },
  chartLegend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: colors.mutedText,
  },
  categoryCard: {
    // backgroundColor: colors.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 16,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  categoryPercent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryPercentText: {
    fontSize: 14,
    color: colors.mutedText,
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.muted,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
});
