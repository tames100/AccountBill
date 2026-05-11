import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "@/components/UI";

export default function AddTransactionModal() {
  const router = useRouter();
  const handleAddBill = () => {
    router.push("/(noTabSrceens)/addBill");
  };

  return (
    <View className="absolute bottom-10 right-10 flex size-16 z-50">
      <Button className={ "size-16 rounded-full bg-primary items-center justify-center" } onPress={ handleAddBill }>
        <Text className="text-4xl text-white">+</Text>
      </Button>
    </View>
  );
}
