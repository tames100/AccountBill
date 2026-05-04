import type { BottomTabItem } from "@/types";

const BOTTOM_TABS: BottomTabItem[] = [
  {
    id: "home",
    title: "首页",
    icon: "home-outline",
    activeIcon: "home", // 可以使用不同的图标
    path: "home",
    order: 1,
    isShow: true,
  },
  {
    id: "calendar",
    title: "日历",
    icon: "calendar-outline",
    activeIcon: "calendar",
    path: "calendar",
    order: 2,
    isShow: true,
  },
  {
    id: "assets",
    title: "资产",
    icon: "wallet-outline",
    activeIcon: "wallet",
    path: "assets",
    order: 3,
    isShow: true,
  },
  {
    id: "chart",
    title: "统计",
    icon: "stats-chart-outline",
    activeIcon: "stats-chart",
    path: "billCharts",
    order: 4,
    isShow: true,
  },
  {
    id: "personal",
    title: "我的",
    icon: "person-outline",
    activeIcon: "person",
    path: "personal",
    order: 5,
    isShow: true
  },
];
export default BOTTOM_TABS
