import React from 'react';
import { View } from 'react-native';
import { ContributionGraph } from "react-native-chart-kit";
import { screenHeight, screenWidth } from "@/constants/screen";
import { chartConfig } from "@/config/chartCnonfig";
import { tw } from "@/constants/theme";

interface ContributionGraphUIProps {
}

/**
 * 组件介绍
 * @param props
 * @constructor
 */
export default function ContributionGraphUI(props: ContributionGraphUIProps) {
  const heatmapData = [
    { date: "2025-01-01", count: 5 },
    { date: "2025-01-02", count: 12 },
    { date: "2025-01-03", count: 8 },
    { date: "2025-01-04", count: 3 },
    { date: "2025-01-05", count: 3 },
    { date: "2025-01-06", count: 3 },
    { date: "2025-01-07", count: 3 },
    { date: "2025-01-08", count: 3 },
    { date: "2025-01-09", count: 3 },
    { date: "2025-01-10", count: 3 },
    { date: "2025-01-11", count: 3 },
    { date: "2025-12-12", count: 30 },
    // ...更多数据
  ];

  return (
    <ContributionGraph
      values={ heatmapData }
      endDate={ new Date("2025-12-31") }
      numDays={ 180 }
      width={ screenWidth }
      height={ 220 }
      gutterSize={ 2 }
      squareSize={ 10 }
      horizontal={ true }
      showMonthLabels={ true }
      chartConfig={ {
        ...chartConfig,
        color: (opacity = 1) => `rgba(255, 167, 38, ${ opacity })`,
      } }
      accessor="count"
      style={ { borderRadius: 16 } }
      tooltipDataAttrs={ (data) => ({
        color: tw.colors.primary,
      }) }

    />
  );
}