import React from "react";
import { View } from "react-native";

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
    children,
  } = props;

  return (
    <View
      className={`
        shadow-sm
        ${backgroundColor ? `bg-[${backgroundColor}]` : "bg-white"}
        ${padding ? `p-[${padding}px]` : "p-4"}
        ${marginBottom ? `mb-[${marginBottom}px]` : "mb-4"}
        ${marginTop ? `mt-[${marginTop}px]` : "mt-4"}
        ${borderRadius ? `rounded-[${borderRadius}px]` : "rounded-2xl"}
        ${isBorder ? (borderWidth ? `border-[${borderWidth}px]` : "border") : "border"}
        ${isBorder && borderColor ? `border-[${borderColor}]` : "border-border"}
      `}
    >
      {children}
    </View>
  );
}

// 样式已迁移到nativeWind类名
