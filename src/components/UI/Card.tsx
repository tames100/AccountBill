import React from 'react';
import { View } from 'react-native';

interface CardProps {
  padding?: number;
  backgroundColor?: string;
  marginBottom?: number;
  marginTop?: number;
  borderRadius?: number;
  children: React.ReactNode;
}


/**
 * 卡片容器
 * @param props
 * @param children
 * @constructor
 */
export default function Card(props: CardProps) {
  const {backgroundColor, borderRadius, marginBottom, marginTop, padding, children} = props;

  return (
    <View style={ [{
      backgroundColor: backgroundColor ?? 'white',
      borderRadius: borderRadius ?? 20,
      padding: padding ??16,
      marginBottom: marginBottom ??16,
      marginTop: marginTop ?? 16,
    },
    ] }
    >{ children }</View>
  );
}