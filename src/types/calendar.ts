import { Transaction } from "@/types/transaction";

export interface DayData {
  date: number;
  transactions: Transaction[];
  // 农历月
  lunarMonth?: string;
  // 农历日
  lunarDay?: string;
  // 公历节日或节气
  festival?: string;
  isToday?: boolean;
}