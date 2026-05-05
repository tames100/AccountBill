/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // 主色
        primary: "#889871",
        // 收入颜色（浅色背景）
        income: "#4cac90",
        // 支出颜色（浅色背景）
        expense: "#fa5654",
        // 结余（浅色背景）
        balance: "#FF9800",
        // 收入颜色（深色色背景）
        incomeDark: "#2F705E",
        // 支出颜色（深色色背景）
        expenseDark: "#B83230",
        // 结余（深色色背景）
        balanceDark: "#BA6A00",
        // 屏幕背景色
        screenBackground: "#f8f9f6",
        // 文字颜色
        text: "#000000",
        // 卡片文字
        cardText: "#000000",
        // 弹窗背景
        popover: "#ffffff",
        // 弹窗文字
        popoverText: "#000000",
        // 主要文字颜色
        primaryText: "#ffffff",
        // 次要背景颜色
        secondary: "#f0f0f4",
        // 次要文字
        secondaryText: "#030213",
        // 弱背景
        muted: "#ececf0",
        // 弱文字
        mutedText: "#717182",
        // 强调背景
        accent: "#e9ebef",
        // 强调文字
        accentText: "#030213",
        // 删除警告退出
        destructive: "#d4183d",
        // 对应文字
        destructiveText: "#ffffff",
        // 边框颜色
        border: "rgba(0, 0, 0, 0.08)",
        // 输入框文字
        input: "transparent",
        // 输入框背景
        inputBackground: "#f3f3f5",
        // 开关背景
        switchBackground: "#cbced4",
        // 输入宽聚焦
        ring: "#717182",
        // 统计图的预设颜色
        chart1: "#57c0e6",
        chart2: "#45a29e",
        chart3: "#3b7eb8",
        chart4: "#e8d68c",
        chart5: "#d9c869",
      },
      fontSize: {
        xs: "10px",
        sm: "12px",
        base: "14px",
        lg: "16px",
        xl: "20px",
        "2xl": "28px",
        "3xl": "42px",
      },
    },
  },
  plugins: [],
};
