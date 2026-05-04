import { colors } from "@/constants/theme";
import { Platform, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
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
    <SafeAreaView style={ styles.container } edges={ ["top"] }>
      <View style={ styles.header }>
        <Text style={ styles.title }>我的</Text>
      </View>

      <View style={ styles.content }>
        <View style={ [styles.profileCard, { backgroundColor: colors.primary }] }>
          <View style={ styles.profileHeader }>
            <View style={ styles.avatar }>
              <Icon name={"person"} size={32} color={"#ffffff"} />
            </View>
            <View style={ styles.profileInfo }>
              <Text style={ styles.profileName }>记账用户</Text>
              <Text style={ styles.profileMeta }>已记账 156 天</Text>
            </View>
          </View>
          <View style={ styles.profileStats }>
            <View style={ styles.statItem }>
              <Text
                style={ [
                  styles.statLabel,
                  { color: "rgba(255, 255, 255, 0.7)" },
                ] }
              >
                总交易
              </Text>
              <Text style={ styles.statValue }>342</Text>
            </View>
            <View style={ styles.statItem }>
              <Text
                style={ [
                  styles.statLabel,
                  { color: "rgba(255, 255, 255, 0.7)" },
                ] }
              >
                总收入
              </Text>
              <Text style={ styles.statValue }>¥28.5k</Text>
            </View>
            <View style={ styles.statItem }>
              <Text
                style={ [
                  styles.statLabel,
                  { color: "rgba(255, 255, 255, 0.7)" },
                ] }
              >
                总支出
              </Text>
              <Text style={ styles.statValue }>¥12.3k</Text>
            </View>
          </View>
        </View>

        { menuItems.map((section, sectionIndex) => (
          <View key={ sectionIndex } style={ styles.menuSection }>
            <Text style={ styles.menuSectionTitle }>{ section.section }</Text>
            <View style={ styles.menuCard }>
              { section.items.map((item, itemIndex) => {
                const isLast = itemIndex === section.items.length - 1;
                return (
                  <TouchableOpacity
                    key={ itemIndex }
                    style={ [
                      styles.menuItem,
                      {
                        borderBottomWidth: isLast ? 0 : 1,
                        borderBottomColor: "rgba(0, 0, 0, 0.08)",
                      },
                    ] }
                  >
                    <View style={ styles.menuItemLeft }>
                      <View style={ styles.menuItemIcon }>
                        <Icon name={item.icon}  size={ 20 } color={ colors.mutedText }/>
                      </View>
                      <Text style={ styles.menuItemLabel }>{ item.label }</Text>
                    </View>
                    <View style={ styles.menuItemRight }>
                      { item.badge && (
                        <View style={ styles.badge }>
                          <Text style={ styles.badgeText }>{ item.badge }</Text>
                        </View>
                      ) }
                      { item.toggle ? (
                        <View style={ styles.toggle }>
                          <View style={ styles.toggleKnob }/>
                        </View>
                      ) : (
                        <Text style={ styles.chevron }>›</Text>
                      ) }
                    </View>
                  </TouchableOpacity>
                );
              }) }
            </View>
          </View>
        )) }

        <Text style={ styles.version }>记账本 v1.0.0</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  profileCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "500",
    color: "#ffffff",
    marginBottom: 2,
  },
  profileMeta: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  profileStats: {
    flexDirection: "row",
    gap: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff",
  },
  menuSection: {
    marginBottom: 24,
  },
  menuSectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.mutedText,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  menuCard: {
    // backgroundColor: colors.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    // backgroundColor: colors.card,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.muted,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: colors.expense,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ffffff",
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.muted,
    position: "relative",
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    position: "absolute",
    left: 2,
    top: 2,
  },
  chevron: {
    fontSize: 18,
    color: colors.mutedText,
  },
  version: {
    textAlign: "center",
    fontSize: 14,
    color: colors.mutedText,
    marginTop: 32,
  },
});
