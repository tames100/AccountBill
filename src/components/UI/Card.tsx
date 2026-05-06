import React from "react";
import { View, ViewStyle } from "react-native";

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
  style?: ViewStyle;
}

export default function Card({
  backgroundColor = "bg-primary",
  marginBottom = 4,
  marginTop = 0,
  padding = 4,
  borderRadius = 16,
  isBorder = false,
  borderWidth = 1,
  borderColor = "border-border",
  children,
  style,
}: CardProps) {
  const marginBottomStyle: ViewStyle = marginBottom
    ? { marginBottom: marginBottom * 4 }
    : {};
  const marginTopStyle: ViewStyle = marginTop
    ? { marginTop: marginTop * 4 }
    : {};
  const paddingStyle: ViewStyle = padding
    ? { padding: padding * 4 }
    : { padding: 16 };
  const borderRadiusStyle: ViewStyle = borderRadius
    ? { borderRadius: borderRadius }
    : { borderRadius: 16 };

  const bgColorMap: Record<string, string> = {
    primary: "bg-primary",
    white: "bg-white",
    income: "bg-income",
    expense: "bg-expense",
  };

  const borderColorMap: Record<string, string> = {
    "border-border": "rgba(0, 0, 0, 0.08)",
  };

  return (
    <View
      className={`shadow-sm ${bgColorMap[backgroundColor] || "bg-primary"} rounded-2xl ${isBorder ? "border" : "border"}`}
      style={[
        paddingStyle,
        marginBottomStyle,
        marginTopStyle,
        borderRadiusStyle,
        isBorder
          ? {
              borderWidth: borderWidth,
              borderColor: borderColorMap[borderColor] || borderColor,
            }
          : {},
        style,
      ]}
    >
      {children}
    </View>
  );
}
