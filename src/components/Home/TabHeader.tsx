import { tw } from "@/constants/theme";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "@/components/UI";

/**
 * 顶部tab栏
 *
 * 功能：
 * - 切换账本
 * - 搜索
 * - 更多功能
 * @constructor
 * @author thy
 */
function TabHeader() {
  return (
    <View className="w-full h-7 flex-row items-center justify-between">
      {/* 账本选择 */}
      <View className="flex-1 flex-row items-start">
        <TouchableOpacity activeOpacity={0.9}>
          <View className="flex flex-row gap-2.5">
            <Icon name={"wallet"} />
            <Text className="text-lg font-medium text-ring">生活日常</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-2 flex-row justify-end gap-2.5">
        <TouchableOpacity activeOpacity={0.9}>
          <View className="flex-row gap-2.5">
            <Icon name={"search"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9}>
          <View className="flex-row gap-2.5">
            <Icon name={"ellipsis-vertical"} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TabHeader;
