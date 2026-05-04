// ------------------------------
// 导航配置数组（完全自定义！）
// ------------------------------
import Home from "@/app/(tabs)/home";
import CalendarPage from "@/app/(tabs)/calendar";

export const tabRoutes = [
  {
    name: 'Home',
    title: '首页',
    icon: 'home',
    component: Home,
  },
  {
    name: 'Calendar',
    title: '搜索',
    icon: 'search',
    component: CalendarPage,
  },
];