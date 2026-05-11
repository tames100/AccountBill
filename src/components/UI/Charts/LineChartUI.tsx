import { LineChart } from "react-native-chart-kit";
import { LineChartProps } from "react-native-chart-kit/dist/line-chart/LineChart";
import { screenWidth } from "@/constants/screen";
import { chartConfig } from "@/config/chartCnonfig";
// props: LineChartProps
export default function LineChartUI() {

  const data = {
    labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
    datasets: [{ data: [20, 45, 28, 80, 99, 43], color: () => `rgba(255, 167, 38, 1)` }]
  }

  return (
    <LineChart
      data={ data }
      width={ screenWidth }
      height={ 220 }
      bezier={ true }
      chartConfig={ chartConfig }
      style={ {
        marginVertical: 8,
        borderRadius: 16,
      } }/>
  )
}