import React from 'react';
import { View } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import { screenWidth } from "@/constants/screen";
import { chartConfig } from "@/config/chartCnonfig";
import { tw } from "@/constants/theme";

interface BarChartUIProps {
}

/**
 * 组件介绍
 * @param props
 * @constructor
 */
export default function BarChartUI(props: BarChartUIProps) {
  const data = {
    labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    datasets: [{ data: [50, 60, 70, 80, 90, 100, 110] }]
  }

  return (
    <BarChart
      data={ data }
      width={ screenWidth }
      height={ 220 }
      yAxisLabel="$"
      yAxisSuffix="k"
      xAxisLabel={"周"}
      xLabelsOffset={2}
      chartConfig={ {
        ...chartConfig,
        barPercentage: 0.7,      // 柱子粗细
        scrollableDotFill: "123",
        fillShadowGradientFrom: tw.colors.chart1,
        fillShadowGradientTo: tw.colors.chart5,
        formatTopBarValue: (topBarValue)=>topBarValue.toString(),
        backgroundColor: "#ffffff",
        backgroundGradientFrom: tw.colors.primary,
        backgroundGradientTo: tw.colors.primary,
      } }
      style={ { marginVertical: 8, borderRadius: 16 } }
    />
  );
}