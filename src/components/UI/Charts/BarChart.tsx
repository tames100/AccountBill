// components/BarChart.tsx
import React from 'react';
import EChartsCore from './EchartsCore';
import * as echarts from 'echarts/core';
import { BarChart as BarChartECharts } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { SVGRenderer } from "@wuba/react-native-echarts";

echarts.use([BarChartECharts, GridComponent, TooltipComponent, LegendComponent, SVGRenderer]);

interface BarChartProps {
  xAxisData?: string[];
  series?: { name: string; data: number[]; color?: string }[];
  animation?: boolean;
  animationDuration?: number;
}

const BarChart: React.FC<BarChartProps> = ({
                                             xAxisData,
                                             series,
                                             animation = true,
                                             animationDuration = 1000,
                                           }) => {
  const option = {
    tooltip: { trigger: 'axis' },
    legend: { data: series?.map(s => s.name) },
    grid: { containLabel: true },
    xAxis: { type: 'category', data: xAxisData || ['周一', '周二', '周三', '周四', '周五'] },
    yAxis: { type: 'value' },
    series: series?.map(s => ({
      name: s.name || "销量",
      type: 'bar',
      data: s.data || [10, 20, 30, 50, 40],
      itemStyle: { color: s.color|| "#dfdfdf" },
      animation: animation || true,
      animationDuration: animationDuration || 1000,
    })),
  };
  return <EChartsCore option={ option }/>;
};

export default BarChart;