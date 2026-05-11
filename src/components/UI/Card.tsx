import React from "react";
import { View } from "react-native";
import { twMerge } from "tailwind-merge"
import { printLog } from "@/utils/printLog";

interface CardProps {
  isBorder?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Card({ isBorder = true, className = "", children, }: CardProps) {

  const defaultClassName = "shadow-none ios:shadow-sm android:elevation-sm bg-white shadow-none rounded-2xl p-4 mb-3"

  const mergedClassName = twMerge(
    defaultClassName,
    isBorder ? `border-border border` : "",
    className,
  )

  printLog("card的类名", mergedClassName)

  return (
    <View className={ mergedClassName }>
      { children }
    </View>
  );
}
