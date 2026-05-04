import { IconName } from "@/types";

export interface BottomTabItem {
  id: string;
  title: string;
  icon: IconName;
  activeIcon: IconName;
  path: string;
  order: number;
  isShow: boolean;
}
