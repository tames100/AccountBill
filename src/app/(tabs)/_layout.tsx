import { Tabs } from "expo-router";
import BOTTOM_TABS from "@/config/navigatorTab";
import { Icon } from "@/components/UI";
import { colors } from "@/constants/theme";
import { settings } from "@/config/setting";
import { Text } from "react-native";

export default function TabLayout() {

  return (
    <Tabs screenOptions={ {
      headerShown: false,
    } }>
      { BOTTOM_TABS
        .sort((a, b) => a.order - b.order)
        .filter(item => item.isShow)
        .map(item => (
          <Tabs.Screen
            key={ item.id }
            name={ item.path }
            options={ {
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  name={ focused ? item.activeIcon : item.icon }
                  color={ focused ? colors.primary : color }
                  size={ 24 }/>
              ),
              tabBarShowLabel: settings.isShowBottomTabLabel,
              tabBarLabel: ({ color, focused }) => <Text style={ {
                color: focused ? colors.primary : color,
                fontSize: 10
              } }>
                { item.title }
              </Text>
            } }
          />
        )) }
    </Tabs>
  );
}