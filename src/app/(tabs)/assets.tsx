import { colors } from "@/constants/theme";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@/components/UI";

interface Asset {
  id: string;
  name: string;
  type: string;
  balance: number;
  icon: string;
  color: string;
}

export default function Assets() {
  const assets: Asset[] = [
    {
      id: "1",
      name: "现金",
      type: "钱包",
      balance: 1200,
      icon: "👛",
      color: colors.primary,
    },
    {
      id: "2",
      name: "招商银行",
      type: "储蓄卡",
      balance: 15800,
      icon: "🏦",
      color: "#fa5654",
    },
    {
      id: "3",
      name: "支付宝",
      type: "电子账户",
      balance: 3450,
      icon: "📱",
      color: "#4cac90",
    },
    {
      id: "4",
      name: "微信支付",
      type: "电子账户",
      balance: 890,
      icon: "📱",
      color: "#FF9800",
    },
    {
      id: "5",
      name: "信用卡",
      type: "招商银行",
      balance: -2500,
      icon: "💳",
      color: "#9aaa83",
    },
  ];

  const totalAssets = assets.reduce(
    (sum, asset) => sum + (asset.balance > 0 ? asset.balance : 0),
    0,
  );
  const totalDebt = Math.abs(
    assets.reduce(
      (sum, asset) => sum + (asset.balance < 0 ? asset.balance : 0),
      0,
    ),
  );
  const netAssets = totalAssets - totalDebt;

  return (
    <SafeAreaView style={ styles.container } edges={ ["top"] }>
      <View style={ styles.header }>
        <Text style={ styles.title }>资产</Text>
        <TouchableOpacity style={ styles.addButton }>
          <Icon name={"add"} size={20} color={"#ffffff"} />
        </TouchableOpacity>
      </View>

      <View style={ styles.content }>
        <View style={ [styles.totalCard, { backgroundColor: colors.primary }] }>
          <Text
            style={ [styles.totalLabel, { color: "rgba(255, 255, 255, 0.7)" }] }
          >
            净资产
          </Text>
          <Text style={ styles.totalAmount }>
            ¥{ netAssets.toLocaleString("zh-CN") }
          </Text>
          <View style={ styles.totalGrid }>
            <View style={ styles.totalItem }>
              <Text
                style={ [
                  styles.totalItemLabel,
                  { color: "rgba(255, 255, 255, 0.7)" },
                ] }
              >
                总资产
              </Text>
              <Text style={ [styles.totalItemAmount, { color: "#ffffff" }] }>
                ¥{ totalAssets.toLocaleString("zh-CN") }
              </Text>
            </View>
            <View style={ styles.totalItem }>
              <Text
                style={ [
                  styles.totalItemLabel,
                  { color: "rgba(255, 255, 255, 0.7)" },
                ] }
              >
                总负债
              </Text>
              <Text style={ [styles.totalItemAmount, { color: "#ffffff" }] }>
                ¥{ totalDebt.toLocaleString("zh-CN") }
              </Text>
            </View>
          </View>
        </View>

        <View style={ styles.statsGrid }>
          <View style={ styles.statCard }>
            <Text style={ styles.statLabel }>账户数</Text>
            <Text style={ styles.statAmount }>{ assets.length }</Text>
          </View>
          <View style={ styles.statCard }>
            <Text style={ styles.statLabel }>本月变动</Text>
            <Text style={ [styles.statAmount, { color: colors.income }] }>
              +12%
            </Text>
          </View>
          <View style={ styles.statCard }>
            <Text style={ styles.statLabel }>投资收益</Text>
            <Text style={ [styles.statAmount, { color: colors.income }] }>
              ¥0
            </Text>
          </View>
        </View>

        <View style={ styles.section }>
          <Text style={ styles.sectionTitle }>账户列表</Text>
          { assets.map((asset) => {
            const isDebt = asset.balance < 0;
            return (
              <View
                key={ asset.id }
                style={ [
                  styles.assetCard,
                  {
                    backgroundColor: "white",
                    borderRadius: 16,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: "rgba(0, 0, 0, 0.08)",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.04,
                    shadowRadius: 8,
                    elevation: 2,
                  },
                ] }
              >
                <View style={ styles.assetContent }>
                  <View style={ styles.assetLeft }>
                    <View
                      style={ [
                        styles.assetIcon,
                        {
                          backgroundColor: `${ asset.color }15`,
                        },
                      ] }
                    >
                      <Text style={ styles.assetIconText }>{ asset.icon }</Text>
                    </View>
                    <View style={ styles.assetInfo }>
                      <Text style={ styles.assetName }>{ asset.name }</Text>
                      <Text style={ styles.assetType }>{ asset.type }</Text>
                    </View>
                  </View>
                  <View style={ styles.assetRight }>
                    <Text
                      style={ [
                        styles.assetAmount,
                        {
                          color: isDebt ? colors.expense : colors.text,
                        },
                      ] }
                    >
                      { isDebt ? "-" : "" }¥
                      { Math.abs(asset.balance).toLocaleString("zh-CN") }
                    </Text>
                    { isDebt && <Text style={ styles.assetDebt }>待还款</Text> }
                  </View>
                </View>
              </View>
            );
          }) }
        </View>

        <View style={ styles.distributionCard }>
          <Text style={ styles.distributionTitle }>资产分布</Text>
          { assets
            .filter((a) => a.balance > 0)
            .sort((a, b) => b.balance - a.balance)
            .map((asset) => {
              const percent = ((asset.balance / totalAssets) * 100).toFixed(1);
              return (
                <View key={ asset.id } style={ styles.distributionItem }>
                  <View style={ styles.distributionInfo }>
                    <Text style={ styles.distributionIcon }>{ asset.icon }</Text>
                    <Text style={ styles.distributionName }>{ asset.name }</Text>
                  </View>
                  <Text style={ styles.distributionPercent }>{ percent }%</Text>
                  <View style={ styles.distributionBar }>
                    <View
                      style={
                        [styles.distributionFill]
                      }
                    />
                  </View>
                </View>
              );
            }) }
        </View>
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
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    color: colors.text,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  totalCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 42,
    fontWeight: "500",
    color: "#ffffff",
    marginBottom: 16,
    lineHeight: 42,
  },
  totalGrid: {
    flexDirection: "row",
    gap: 16,
  },
  totalItem: {
    flex: 1,
  },
  totalItemLabel: {
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 4,
  },
  totalItemAmount: {
    fontSize: 20,
    fontWeight: "500",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    // backgroundColor: colors.card,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: colors.mutedText,
    marginBottom: 4,
  },
  statAmount: {
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 12,
  },
  assetCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  assetContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  assetLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  assetIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  assetIconText: {
    fontSize: 24,
  },
  assetInfo: {
    flex: 1,
    gap: 4,
  },
  assetName: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 2,
  },
  assetType: {
    fontSize: 13,
    color: colors.mutedText,
  },
  assetRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  assetAmount: {
    fontSize: 20,
    fontWeight: "500",
  },
  assetDebt: {
    fontSize: 12,
    color: colors.expense,
  },
  distributionCard: {
    // backgroundColor: colors.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
  },
  distributionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 16,
  },
  distributionItem: {
    marginBottom: 12,
  },
  distributionInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  distributionIcon: {
    fontSize: 16,
  },
  distributionName: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  distributionPercent: {
    fontSize: 14,
    color: colors.mutedText,
    marginBottom: 4,
  },
  distributionBar: {
    height: 8,
    backgroundColor: colors.muted,
    borderRadius: 4,
    overflow: "hidden",
  },
  distributionFill: {
    height: "100%",
    borderRadius: 4,
  },
});
