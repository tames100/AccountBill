// components/PieChart.tsx
import React from 'react';
import EChartsCore from './EchartsCore';
import * as echarts from 'echarts/core';
import { PieChart as PieChartECharts } from 'echarts/charts';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { SVGRenderer } from "@wuba/react-native-echarts";

echarts.use([PieChartECharts, TooltipComponent, LegendComponent, SVGRenderer]);

interface PieChartProps {
  data: { name: string; value: number }[];
  centerText?: string;      // 中心文字（仅当环形时常用）
  radius?: [string, string]; // 例如 ['40%', '70%'] 变成圆环
  animation?: boolean;
  animationDuration?: number;
}

const PieChart: React.FC<PieChartProps> = ({
                                             data,
                                             radius = ['0%', '70%'],
                                             animation = true,
                                             animationDuration = 1000,
                                           }) => {
  const option = {
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [
      {
        name: '饼图',
        type: 'pie',
        radius: radius,
        data: data,
        animation: animation,
        animationDuration: animationDuration,
        label: { show: true, formatter: '{b}: {d}%' },
      },
    ],
  };
  return <EChartsCore option={option} />;
};

export default PieChart;