// components/EChartsCore.tsx
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
import * as echarts from 'echarts/core';

echarts.use(SVGRenderer);

interface EChartsCoreProps {
  option: any;
  onInit?: (chart: any) => void;
}

export interface EChartsCoreRef {
  setOption: (option: any, notMerge?: boolean) => void;
  getChart: () => any;
}

const EChartsCore = forwardRef<EChartsCoreRef, EChartsCoreProps>(({ option, onInit }, ref) => {
  const chartRef = useRef<any>(null);
  const chartInstance = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    setOption: (newOption, notMerge = false) => {
      chartInstance.current?.setOption(newOption, notMerge);
    },
    getChart: () => chartInstance.current,
  }));

  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      const instance = echarts.init(chartRef.current);
      chartInstance.current = instance;
      instance.setOption(option);
      onInit?.(instance);
    }
    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [option, onInit]);

  return <SvgChart ref={ chartRef } style={ { width: '100%', height: '100%' } }/>;
});

export default EChartsCore;