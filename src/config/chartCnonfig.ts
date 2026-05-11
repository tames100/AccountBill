import { tw } from "@/constants/theme";
import { ChartConfig } from "react-native-chart-kit/dist/HelperTypes";

export const chartConfig: ChartConfig = {
  backgroundColor: tw.colors.primary,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: "6", strokeWidth: "2", stroke: tw.colors.primary },
};