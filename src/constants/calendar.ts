import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const CalendarCellWidth = Math.floor((width - 32) / 7);