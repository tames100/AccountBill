import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CardProps {
  padding?: number;
  backgroundColor?: string;
  marginBottom?: number;
  marginTop?: number;
  borderRadius?: number;
  isBorder?: boolean;
  borderWidth?: number;
  borderColor?: string;
  children: React.ReactNode;
}


/**
 * 卡片容器
 * @param props
 * @param children
 * @constructor
 */
export default function Card(props: CardProps) {
  const {
    backgroundColor,
    borderRadius,
    marginBottom,
    marginTop,
    padding,
    isBorder,
    borderWidth,
    borderColor,
    children
  } = props;

  return (
    <View style={ [
      styles.container,
      {
        backgroundColor: backgroundColor ?? 'white',
        padding: padding ?? 16,
        marginBottom: marginBottom ?? 16,
        marginTop: marginTop ?? 16,
        borderRadius: borderRadius ?? 20,
        borderWidth: isBorder ? borderWidth : 1,
        borderColor: isBorder ? borderColor : "rgba(0, 0, 0, 0.08)",
      },
    ] }
    >{ children }</View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  }
})