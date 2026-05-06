import "../../global.css"; // 导入全局CSS
import { settings } from "@/config/setting";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider value={settings.theme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name={"(tabs)"} />
      </Stack>
    </ThemeProvider>
  );
}
