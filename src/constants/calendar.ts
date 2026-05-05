import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const CalendarCellWidth = Math.floor((width - 32) / 7);

// 周标题(周日开头)
export const weekDaysOfFristRi = ['日', '一', '二', '三', '四', '五', '六'];

// 周标题(周一开头)
export const weekDaysOfFristOne = ['一', '二', '三', '四', '五', '六', '日',];