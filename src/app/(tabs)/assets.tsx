import { Icon } from "@/components/UI";
import { tw } from "@/constants/theme";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      color: tw.colors.primary,
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
    <SafeAreaView className="flex-1 bg-screenBackground" edges={["top"]}>
      <View
        className="px-5 pt-5 pb-4 flex-row items-center justify-between"
        style={{ paddingTop: Platform.OS === "ios" ? 64 : 20 }}
      >
        <Text className="text-3xl font-medium text-text">资产</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-primary items-center justify-center">
          <Icon name={"add"} size={20} color={"#ffffff"} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-5 pb-25">
        <View className="rounded-3xl p-6 mb-4 bg-primary">
          <Text
            className="text-sm font-normal"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            净资产
          </Text>
          <Text className="text-5xl font-medium text-white mb-4 leading-10">
            ¥{netAssets.toLocaleString("zh-CN")}
          </Text>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text
                className="text-xs font-normal"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                总资产
              </Text>
              <Text className="text-xl font-medium text-white">
                ¥{totalAssets.toLocaleString("zh-CN")}
              </Text>
            </View>
            <View className="flex-1">
              <Text
                className="text-xs font-normal"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                总负债
              </Text>
              <Text className="text-xl font-medium text-white">
                ¥{totalDebt.toLocaleString("zh-CN")}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-white rounded-2xl p-3 border border-border items-center">
            <Text className="text-xs text-mutedText mb-1">账户数</Text>
            <Text className="text-2xl font-medium">{assets.length}</Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-3 border border-border items-center">
            <Text className="text-xs text-mutedText mb-1">本月变动</Text>
            <Text className="text-2xl font-medium text-income">+12%</Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-3 border border-border items-center">
            <Text className="text-xs text-mutedText mb-1">投资收益</Text>
            <Text className="text-2xl font-medium text-income">¥0</Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-base font-medium text-text mb-3">账户列表</Text>
          {assets.map((asset) => {
            const isDebt = asset.balance < 0;
            return (
              <View
                key={asset.id}
                className="bg-white rounded-2xl p-4 border border-border shadow-sm mb-3"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1 gap-3">
                    <View
                      className="w-12 h-12 rounded-full items-center justify-center"
                      style={{ backgroundColor: `${asset.color}15` }}
                    >
                      <Text className="text-2xl">{asset.icon}</Text>
                    </View>
                    <View className="flex-1 gap-1">
                      <Text className="text-base font-medium text-text">
                        {asset.name}
                      </Text>
                      <Text className="text-sm text-mutedText">
                        {asset.type}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end gap-1">
                    <Text
                      className={`text-xl font-medium ${isDebt ? "text-expense" : "text-text"}`}
                    >
                      {isDebt ? "-" : ""}¥
                      {Math.abs(asset.balance).toLocaleString("zh-CN")}
                    </Text>
                    {isDebt && (
                      <Text className="text-xs text-expense">待还款</Text>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View className={"rounded-3xl p-5 border border-border"}>
          <Text className={"text-sm font-medium text-text"}>资产分布</Text>
          {assets
            .filter((a) => a.balance > 0)
            .sort((a, b) => b.balance - a.balance)
            .map((asset) => {
              const percent = ((asset.balance / totalAssets) * 100).toFixed(1);
              return (
                <View key={asset.id} className="mb-3">
                  <View className="flex-row items-center gap-2 mb-2">
                    <Text className="text-base">{asset.icon}</Text>
                    <Text className="text-sm font-medium text-text">
                      {asset.name}
                    </Text>
                  </View>
                  <Text className="text-sm text-mutedText mb-1">
                    {percent}%
                  </Text>
                  <View className="w-full h-2 bg-muted rounded-full">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: asset.color,
                      }}
                    />
                  </View>
                </View>
              );
            })}
        </View>
      </View>
    </SafeAreaView>
  );
}
