import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function AddTransactionModal() {
  const router = useRouter();
  const handleAddBill = () => {
    router.push("/(noTabSrceens)/addBill");
  };

  return (
    <View className="absolute bottom-10 right-10 flex w-16 h-16 z-50">
      <View>
        <TouchableOpacity
          className="w-16 h-16 rounded-full bg-primary items-center justify-center"
          activeOpacity={0.8}
          onPress={handleAddBill}
        >
          <Text className="text-4xl text-white">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
