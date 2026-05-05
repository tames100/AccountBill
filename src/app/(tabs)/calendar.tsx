import { CalendarTabHeader } from "@/components/Calendar";
import CalendarContain from "@/components/Calendar/CalendarContain";
import { LayoutComponent } from "@/components/Common";
import React from "react";
import { Dimensions } from "react-native";

// 用于计算网格宽度（7列）
const { width: screenWidth } = Dimensions.get("window");
const cellWidth = screenWidth / 7;

// 定义每日收支项
interface Transaction {
  amount: number; // 正数为收入，负数为支出
}

// 定义日期数据（增强后包含农历）
interface DayData {
  date: number;
  transactions: Transaction[];
  lunarMonth?: string; // 农历月
  lunarDay?: string; // 农历日
  festival?: string; // 公历节日或节气
  isToday?: boolean;
}

export default function Calendar() {
  return (
    <LayoutComponent>
      <LayoutComponent.Header>
        <CalendarTabHeader />
      </LayoutComponent.Header>
      <LayoutComponent.Content>
        <CalendarContain />
      </LayoutComponent.Content>
    </LayoutComponent>
  );
}
