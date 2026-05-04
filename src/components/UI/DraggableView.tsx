import React, { ReactNode, useRef } from 'react';
import { Animated, Dimensions, View, ViewStyle } from 'react-native';

interface DraggablePanelProps {
}

const { height } = Dimensions.get('window');
const MAX_DOWN = 180;    // 最大下拉距离
const MAX_UP = -100;     // 最大上拉距离

interface DraggablePanelProps {
  children: ReactNode;         // 外部传入的任意内容
  style?: ViewStyle;            // 可选自定义样式
}

export default function DraggablePanel(props: DraggablePanelProps) {
  const {children, style} = props;

  const pan = useRef(new Animated.Value(0)).current;

  const title = "123";

  return (
    <View>{ title }</View>
  );
}