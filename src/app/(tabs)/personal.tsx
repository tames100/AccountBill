import { tw } from "@/constants/theme";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconName } from "@/types/icon";
import { Icon } from "@/components/UI";

interface MenuItem {
  icon: IconName;
  label: string;
  badge?: string | null;
  toggle?: boolean;
}

interface MenuSection {
  section: string;
  items: MenuItem[];
}

export default function Personal() {
  const menuItems: MenuSection[] = [
    {
      section: "账户设置",
      items: [
        { icon: "image", label: "个人信息", badge: null },
        { icon: "image", label: "消息通知", badge: "3" },
        { icon: "image", label: "隐私与安全", badge: null },
      ],
    },
    {
      section: "数据管理",
      items: [
        { icon: "image", label: "导出数据", badge: null },
        { icon: "image", label: "数据同步", badge: null },
        { icon: "image", label: "账单归档", badge: null },
      ],
    },
    {
      section: "其他",
      items: [
        { icon: "image", label: "深色模式", badge: null, toggle: true },
        // { icon: HelpCircle, label: '帮助中心', badge: null },
        { icon: "image", label: "通用设置", badge: null },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-screenBackground" edges={["top"]}>
      <View
        className="px-5 pb-6"
        style={{ paddingTop: Platform.OS === "ios" ? 64 : 20 }}
      >
        <Text className="text-3xl font-medium text-text mb-6">我的</Text>
      </View>

      <View className="flex-1 px-5 pb-25">
        <View className="rounded-3xl p-6 mb-6 bg-primary">
          <View className="flex-row items-center gap-4 mb-4">
            <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center">
              <Icon name={"person"} size={32} color={"#ffffff"} />
            </View>
            <View className="flex-1 gap-1">
              <Text className="text-xl font-medium text-white">记账用户</Text>
              <Text className="text-sm text-white/70">已记账 156 天</Text>
            </View>
          </View>
          <View className="flex-row gap-4 pt-4 border-t border-white/20">
            <View className="flex-1 items-center">
              <Text className="text-xs font-normal text-white/70 mb-1">
                总交易
              </Text>
              <Text className="text-lg font-medium text-white">342</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-xs font-normal text-white/70 mb-1">
                总收入
              </Text>
              <Text className="text-lg font-medium text-white">¥28.5k</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-xs font-normal text-white/70 mb-1">
                总支出
              </Text>
              <Text className="text-lg font-medium text-white">¥12.3k</Text>
            </View>
          </View>
        </View>

        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} className="mb-6">
            <Text className="text-sm font-medium text-mutedText mb-3 px-1">
              {section.section}
            </Text>
            <View className="bg-white rounded-2xl border border-border overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const isLast = itemIndex === section.items.length - 1;
                return (
                  <TouchableOpacity
                    key={itemIndex}
                    className={`flex-row items-center justify-between px-5 py-4 ${!isLast ? "border-b border-border" : ""}`}
                  >
                    <View className="flex-row items-center gap-3">
                      <View className="w-9 h-9 rounded-full bg-muted items-center justify-center">
                        <Icon
                          name={item.icon}
                          size={20}
                          color={tw.colors.mutedText}
                        />
                      </View>
                      <Text className="text-base font-medium text-text">
                        {item.label}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      {item.badge && (
                        <View className="bg-expense rounded-full px-2 py-0.5">
                          <Text className="text-xs font-medium text-white">
                            {item.badge}
                          </Text>
                        </View>
                      )}
                      {item.toggle ? (
                        <View className="w-11 h-6 bg-muted rounded-full relative">
                          <View className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5" />
                        </View>
                      ) : (
                        <Text className="text-lg text-mutedText">›</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <Text className="text-sm text-mutedText text-center mt-8">
          记账本 v1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
}
