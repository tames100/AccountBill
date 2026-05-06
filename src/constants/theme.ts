// nativeWind样式类名映射
export const tw = {
  // 布局类
  container: "flex-1 bg-screenBackground",
  flex1: "flex-1",
  flexRow: "flex-row",
  flexCol: "flex-col",
  itemsCenter: "items-center",
  justifyCenter: "justify-center",
  flexCenter: "flex items-center justify-center",
  flexRowCenter: "flex-row items-center",
  flexColCenter: "flex-col items-center justify-center",

  // 间距类
  p4: "p-4",
  p6: "p-6",
  px4: "px-4",
  py3: "py-3",
  py4: "py-4",
  gap2: "gap-2",
  gap4: "gap-4",

  // 圆角类
  rounded12: "rounded-xl",
  rounded16: "rounded-2xl",
  rounded20: "rounded-3xl",

  // 文本类
  text: "text-base font-normal text-text",
  textMedium: "text-base font-medium text-text",
  textLarge: "text-2xl font-medium text-text",
  textSmall: "text-sm font-normal text-mutedText",
  textXS: "text-xs font-normal text-mutedText",
  textXXS: "text-xs font-normal text-mutedText",

  // 按钮类
  button: "py-3 px-6 rounded-xl flex-row items-center justify-center gap-2",

  // 图标类
  icon: "w-6 h-6 text-mutedText",
  iconSmall: "w-4 h-4 text-mutedText",
  iconLarge: "w-8 h-8 text-mutedText",

  // 输入框类
  input:
    "py-3 px-4 text-base font-normal text-text bg-inputBackground rounded-xl border-0",

  // 卡片类
  card: "bg-white rounded-2xl p-4 border border-border shadow-sm",

  // 收入支出颜色类
  incomeText: "text-income",
  expenseText: "text-expense",
  balanceText: "text-balance",
  incomeBg: "bg-income",
  expenseBg: "bg-expense",
  balanceBg: "bg-balance",

  // 边框类
  border: "border border-border",

  // 阴影类
  shadow: "shadow-sm",

// 颜色常量（保持兼容性）
  colors: {
    primary: "#889871",
    income: "#4cac90",
    expense: "#fa5654",
    balance: "#FF9800",
    incomeDark: "#2F705E",
    expenseDark: "#B83230",
    balanceDark: "#BA6A00",
    screenBackground: "#f8f9f6",
    text: "#000000",
    cardText: "#000000",
    popover: "#ffffff",
    popoverText: "#000000",
    primaryText: "#ffffff",
    secondary: "#f0f0f4",
    secondaryText: "#030213",
    muted: "#ececf0",
    mutedText: "#717182",
    accent: "#e9ebef",
    accentText: "#030213",
    destructive: "#d4183d",
    destructiveText: "#ffffff",
    border: "rgba(0, 0, 0, 0.08)",
    input: "transparent",
    inputBackground: "#f3f3f5",
    switchBackground: "#cbced4",
    ring: "#717182",
    chart1: "#57c0e6",
    chart2: "#45a29e",
    chart3: "#3b7eb8",
    chart4: "#e8d68c",
    chart5: "#d9c869",
  }
};


// 字体大小常量（保持兼容性）
export const fontSizes = {
  small: 12,
  normal: 14,
  big: 16,
  largeBig: 20,
};
