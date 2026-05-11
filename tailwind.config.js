/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // 主色调
        primary: "var(--color-primary)",
        income: "var(--color-income)",
        expense: "var(--color-expense)",
        balance: "var(--color-balance)",

        // 深色变体
        "income-dark": "var(--color-income-dark)",
        "expense-dark": "var(--color-expense-dark)",
        "balance-dark": "var(--color-balance-dark)",

        // 背景色
        "screen-background": "var(--color-screen-background)",
        "card-background": "var(--color-popover)",

        // 文本色
        text: "var(--color-text)",
        "card-text": "var(--color-card-text)",
        "primary-text": "var(--color-primary-text)",
        "popover-text": "var(--color-popover-text)",
        "secondary-text": "var(--color-secondary-text)",
        "muted-text": "var(--color-muted-text)",
        "accent-text": "var(--color-accent-text)",
        "destructive-text": "var(--color-destructive-text)",

        // 功能色
        secondary: "var(--color-secondary)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        destructive: "var(--color-destructive)",
        border: "var(--color-border)",
        input: "var(--color-input)",
        "input-background": "var(--color-input-background)",
        "switch-background": "var(--color-switch-background)",
        ring: "var(--color-ring)",

        // 图表色
        chart1: "var(--color-chart1)",
        chart2: "var(--color-chart2)",
        chart3: "var(--color-chart3)",
        chart4: "var(--color-chart4)",
        chart5: "var(--color-chart5)",
      },
      fontSize: {
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
      },
      backgroundColor: {
        screen: "var(--color-screen-background)",
        card: "var(--color-popover)",
        input: "var(--color-input-background)",
      },
      borderColor: {
        DEFAULT: "var(--color-border)",
      },
    },
  },
  plugins: [],
};
