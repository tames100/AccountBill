import { Stack } from "expo-router";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { settings } from "@/config/setting";

export default function RootLayout() {
  return (<ThemeProvider value={ settings.theme === 'dark' ? DarkTheme : DefaultTheme }>
    <Stack>
      <Stack.Screen name={ "(tabs)" } options={ {
        headerShown: false,
      } }/>
    </Stack>
  </ThemeProvider>);
}
