import { Icon } from "@/components/UI";
import { Text, TouchableOpacity, View } from "react-native";

function TabHeader() {
  return (
    <View className="w-full h-7 flex-row items-center justify-between mb-2">
      {/* 账本选择 */}
      <View className="flex-1 flex-row items-start">
        <TouchableOpacity activeOpacity={0.9}>
          <View className="flex flex-row gap-2.5">
            <Icon name={"wallet"} />
            <Text className="text-xl font-medium text-ring">生活日常</Text>
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
