import React from 'react';
import { View } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import { screenWidth } from "@/constants/screen";
import { chartConfig } from "@/config/chartCnonfig";

interface PieChartUIProps {
}

/**
 * 组件介绍
 * @param props
 * @constructor
 */
export default function PieChartUI(props: PieChartUIProps) {

  const pieData = [
    { name: "类别A", population: 215, color: "#ffa726", legendFontColor: "#fff" },
    { name: "类别B", population: 98, color: "#42a5f5", legendFontColor: "#fff" },
    { name: "类别C", population: 145, color: "#66bb6a", legendFontColor: "#fff" },
  ];
  return (
  <PieChart
    data={pieData}
    width={screenWidth}
    height={220}
    chartConfig={chartConfig}
    accessor={"population"}   // 数据字段名
    backgroundColor={"transparent"}
    paddingLeft={"15"}
    center={[10, 10]}         // 饼图圆心偏移
    style={{ marginVertical: 8, borderRadius: 16 }}
  />
  );
}