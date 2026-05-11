import { Dimensions } from "react-native";
import { screenWidth } from "@/constants/screen";

export const CalendarCellWidth = Math.floor(screenWidth / 7);

// 周标题(周日开头)
export const weekDaysOfFristRi = ['日', '一', '二', '三', '四', '五', '六'];

// 周标题(周一开头)
export const weekDaysOfFristOne = ['一', '二', '三', '四', '五', '六', '日',];

// 日历折叠高度
export const FULL_CALENDAR_HEIGHT = 360;
export const COLLAPSED_CALENDAR_HEIGHT = 72;