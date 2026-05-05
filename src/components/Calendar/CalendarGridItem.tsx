import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { DayData } from "@/types";
import { CalendarCellWidth } from "@/constants/calendar";
import { tw } from "@/constants/theme";

interface CalendarGridItemProps {
  day: DayData | null;
  index: number;
  income: number;
  expenses: number;
  isSelected?: boolean;
  onPress?: () => void;
}

export default function CalendarGridItem(props: CalendarGridItemProps) {
  const { day, index, income, expenses, isSelected, onPress } = props;

  if (!day)
    return (
      <View
        key={index}
        className={`w-[${CalendarCellWidth - 10}px] aspect-[1/0.9] py-1.5 items-center rounded-xl bg-transparent`}
      />
    );

  return (
    <TouchableOpacity
      className={`
        w-[${CalendarCellWidth - 10}px] aspect-[1/0.9] py-1.5 items-center rounded-xl
        ${day.isToday ? "bg-primary" : ""}
        ${isSelected ? "bg-gray-200" : ""}
      `}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        className={`
          text-lg font-medium text-gray-800
          ${day.isToday ? "text-primaryText font-bold" : ""}
          ${isSelected ? "text-gray-800" : ""}
        `}
      >
        {day.date}
      </Text>
      <Text
        className={`
          text-xs text-mutedText mt-0.5 text-center
          ${isSelected ? "text-gray-800" : ""}
        `}
        numberOfLines={1}
      >
        {day.festival || day.lunarDay || ""}
      </Text>
      {(income > 0 || expenses > 0) && (
        <View className="mt-1">
          {income > 0 && (
            <Text className="text-xs text-income">+{income.toFixed(2)}</Text>
          )}
          {expenses > 0 && <Text>-{expenses.toFixed(2)}</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
}

// 样式已迁移到nativeWind类名
