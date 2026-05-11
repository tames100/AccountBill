import React from 'react';
import { View } from 'react-native';
import { chartConfig } from "@/config/chartCnonfig";
import { screenWidth } from "@/constants/screen";
import { ProgressChart } from "react-native-chart-kit";

interface ProgressChartUIProps {
}

/**
 * 组件介绍
 * @param props
 * @constructor
 */
export default function ProgressChartUI(props: ProgressChartUIProps) {


  return (
  <ProgressChart
    data={{
      labels: ["目标A", "目标B"],
      data: [0.4, 0.7],       // 值范围为 0-1
      colors: ["#ffa726", "#42a5f5"]
    }}
    width={screenWidth}
    height={220}
    chartConfig={chartConfig}
    strokeWidth={16}
    radius={42}
    hideLegend={false}
    style={{ marginVertical: 8, borderRadius: 16 }}
  />
  );
}