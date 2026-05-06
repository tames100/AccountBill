import { LayoutComponent } from "@/components/Common";
import { Icon } from "@/components/UI";
import { tw } from "@/constants/theme";
import { useTransactionStore } from "@/stores";
import { TransactionType } from "@/types/transaction";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// 主分类数据
const mainCategories = [
  { id: "food", name: "食品餐饮", icon: "fast-food-outline" },
  { id: "shopping", name: "购物消费", icon: "cart-outline" },
  { id: "transport", name: "出行交通", icon: "bus-outline" },
  { id: "home", name: "生活家居", icon: "home-outline" },
  { id: "entertainment", name: "休闲娱乐", icon: "game-controller-outline" },
  { id: "clothing", name: "装扮护理", icon: "shirt-outline" },
  { id: "education", name: "文化教育", icon: "book-outline" },
  { id: "gift", name: "送礼人情", icon: "gift-outline" },
  { id: "health", name: "健康医疗", icon: "medical-outline" },
  { id: "beauty", name: "美妆", icon: "sparkles-outline" },
];

// 子分类数据（以食品餐饮为例）
const subCategories: Record<
  string,
  { id: string; name: string; icon: string }[]
> = {
  food: [
    { id: "meal", name: "三餐", icon: "restaurant-outline" },
    { id: "snack", name: "夜宵", icon: "pizza-outline" },
    { id: "grain", name: "粮油", icon: "leaf-outline" },
    { id: "condiment", name: "调味副食", icon: "wine-outline" },
    { id: "rice", name: "米面", icon: "bag-outline" },
    { id: "dining", name: "聚餐会餐", icon: "people-outline" },
    { id: "banquet", name: "宴请招待", icon: "restaurant-outline" },
    { id: "takeout", name: "外卖", icon: "bicycle-outline" },
    { id: "fresh", name: "生鲜食材", icon: "fish-outline" },
    { id: "vegetable", name: "蔬菜", icon: "nutrition-outline" },
    { id: "fruit", name: "水果", icon: "nutrition-outline" },
    { id: "alcohol", name: "酒水", icon: "wine-outline" },
    { id: "drink", name: "饮料", icon: "cafe-outline" },
    { id: "milktea", name: "奶茶", icon: "cafe-outline" },
    { id: "dessert", name: "烘焙甜点", icon: "ice-cream-outline" },
    { id: "icecream", name: "冰淇淋", icon: "ice-cream-outline" },
    { id: "noodle", name: "方便面", icon: "restaurant-outline" },
    { id: "snack2", name: "小吃", icon: "fast-food-outline" },
    { id: "leisure", name: "休闲零食", icon: "cafe-outline" },
    { id: "add", name: "新增", icon: "add-circle-outline" },
  ],
  shopping: [
    { id: "clothes", name: "衣服", icon: "shirt-outline" },
    { id: "shoes", name: "鞋子", icon: "footsteps-outline" },
    { id: "bag", name: "包包", icon: "bag-outline" },
    { id: "digital", name: "数码", icon: "phone-portrait-outline" },
    { id: "appliance", name: "家电", icon: "tv-outline" },
    { id: "daily", name: "日用品", icon: "basket-outline" },
    { id: "add", name: "新增", icon: "add-circle-outline" },
  ],
  transport: [
    { id: "taxi", name: "打车", icon: "car-outline" },
    { id: "bus", name: "公交", icon: "bus-outline" },
    { id: "subway", name: "地铁", icon: "train-outline" },
    { id: "gas", name: "加油", icon: "fuel-outline" },
    { id: "parking", name: "停车", icon: "car-sport-outline" },
    { id: "maintenance", name: "维修保养", icon: "construct-outline" },
    { id: "add", name: "新增", icon: "add-circle-outline" },
  ],
  home: [
    { id: "rent", name: "房租", icon: "home-outline" },
    { id: "property", name: "物业", icon: "business-outline" },
    { id: "water", name: "水费", icon: "water-outline" },
    { id: "electric", name: "电费", icon: "flash-outline" },
    { id: "gas2", name: "燃气", icon: "flame-outline" },
    { id: "internet", name: "网络", icon: "wifi-outline" },
    { id: "add", name: "新增", icon: "add-circle-outline" },
  ],
  entertainment: [
    { id: "movie", name: "电影", icon: "film-outline" },
    { id: "game", name: "游戏", icon: "game-controller-outline" },
    { id: "travel", name: "旅游", icon: "airplane-outline" },
    { id: "sport", name: "运动", icon: "fitness-outline" },
    { id: "add", name: "新增", icon: "add-circle-outline" },
  ],
  clothing: [
    { id: "hair", name: "美发", icon: "cut-outline" },
    { id: "skincare", name: "护肤", icon: "sparkles-outline" },
    { id: "makeup", name: "化妆", icon: "color-palette-outline" },
    { id: "add", name: "新增", icon: "add-circle-outline" },
  ],
  education: [
    { id: "book", name: "书籍", icon: "book-outline" },
    { id: "course", name: "课程", icon: "school-outline" },
    { id: "training", name: "培训", icon: "graduation-cap-outline" },
    { id: "add", name: "新增", icon: "add-circle-outline" },
  ],
  gift: [
    { id: "redpacket", name: "红包", icon: "gift-outline" },
    { id: "present", name: "礼物", icon: "gift-outline" },
    { id: "donate", name: "捐赠", icon: "heart-outline" },
    { id: "add", name: "新增", icon: "add-circle-outline" },
  ],
  health: [
    { id: "medicine", name: "药品", icon: "medical-outline" },
    { id: "hospital", name: "看病", icon: "hospital-outline" },
    { id: "checkup", name: "体检", icon: "pulse-outline" },
    { id: "add", name: "新增", icon: "add-circle-outline" },
  ],
  beauty: [
    { id: "cosmetic", name: "化妆品", icon: "color-palette-outline" },
    { id: "skincare2", name: "护肤品", icon: "sparkles-outline" },
    { id: "add", name: "新增", icon: "add-circle-outline" },
  ],
};

export default function AddBill() {
  const router = useRouter();
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const [amount, setAmount] = useState("0.00");
  const [type, setType] = useState<TransactionType>("expense");
  const [remark, setRemark] = useState("");
  const [selectedMainCategory, setSelectedMainCategory] = useState("food");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showRemarkInput, setShowRemarkInput] = useState(false);

  const currentSubCategories = subCategories[selectedMainCategory] || [];

  const handleSave = () => {
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    addTransaction({
      amount: parseFloat(amount),
      type,
      categoryId: selectedSubCategory || selectedMainCategory,
      remark,
      account: "默认账户",
      createTime: new Date(),
      updateTime: new Date(),
    });

    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const handleNumberPress = (num: string) => {
    if (num === "C") {
      setAmount("0.00");
      return;
    }
    if (num === "DEL") {
      if (amount.length > 1) {
        setAmount(amount.slice(0, -1));
      } else {
        setAmount("0.00");
      }
      return;
    }
    if (num === ".") {
      if (amount.includes(".")) return;
      setAmount(amount + ".");
      return;
    }
    if (num === "+" || num === "-" || num === "×" || num === "÷") {
      return;
    }

    if (amount === "0.00" || amount === "0") {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
  };

  const handleBackspace = () => {
    if (amount.length > 1) {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount("0.00");
    }
  };

  return (
    <LayoutComponent>
      <LayoutComponent.Header>
        <View
          className="flex-row items-center justify-between pl-12 pr-12 border-b bg-screenBackground"
          style={{ borderBottomColor: "rgba(0, 0, 0, 0.08)" }}
        >
          <TouchableOpacity onPress={handleCancel} className={"p-4"}>
            <Icon
              name={"chevron-back-outline"}
              size={24}
              color={tw.colors.text}
            />
          </TouchableOpacity>
          <View className={"flex-row gap-16"}>
            {["expense", "income", "transfer", "debt"].map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setType(t as TransactionType)}
                className={"pt-4 pb-4"}
              >
                <Text
                  className={`font-normal text-mutedText text-base ${type === t && "text-text text-xl"}`}
                >
                  {t === "expense"
                    ? "支出"
                    : t === "income"
                      ? "收入"
                      : t === "transfer"
                        ? "转账"
                        : "债务"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className={"p-4"}>
            <Text className={"text-sm text-mutedText"}>生活日常</Text>
          </View>
        </View>
      </LayoutComponent.Header>
      <LayoutComponent.Content>
        <View className={tw.container}>
          {/* 主分类 */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className={"border-b border-b-border"}
          >
            <View className={"flex-row pt-8 pb-8 pr-12 pl-12 gap-16"}>
              {mainCategories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => {
                    setSelectedMainCategory(cat.id);
                    setSelectedSubCategory("");
                  }}
                  className={`items-center gap-6 pr-8 pl-8 ${selectedMainCategory === cat.id && ""}`}
                >
                  <View
                    className={`rounded-3xl flex-center ${
                      selectedMainCategory === cat.id
                        ? "bg-primary"
                        : "bg-secondary"
                    }`}
                    style={{ width: 48, height: 48 }}
                  >
                    <Icon
                      name={cat.icon as any}
                      size={24}
                      color={
                        selectedMainCategory === cat.id
                          ? "#fff"
                          : tw.colors.text
                      }
                    />
                  </View>
                  <Text
                    className={`text-xs text-text ${
                      selectedMainCategory === cat.id &&
                      "text-primary font-semibold"
                    }`}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* 子分类网格 */}
          <ScrollView className={"flex-1"}>
            <View className={"flex-row flex-wrap px-8 py-12 gap-8"}>
              {currentSubCategories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedSubCategory(cat.id)}
                  className={`items-center py-8 rounded-lg ${selectedSubCategory === cat.id && "bg-primary"}`}
                  style={{ width: (width - 48) / 5 }}
                >
                  <View
                    className={
                      "w-9 h-9 rounded-full flex-center bg-secondary mb-1"
                    }
                  >
                    <Icon
                      name={cat.icon as any}
                      size={20}
                      color={
                        selectedSubCategory === cat.id
                          ? tw.colors.primary
                          : tw.colors.text
                      }
                    />
                  </View>
                  <Text
                    className={`text-xs text-text ${
                      selectedSubCategory === cat.id &&
                      "text-primary font-semibold"
                    }`}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* 底部操作栏 */}
          <View className={"flex-row items-center justify-between"}>
            <View className={"flex-row items-center gap-4"}>
              <TouchableOpacity className={"items-center gap-2"}>
                <Icon
                  name={"pricetag-outline"}
                  size={18}
                  color={tw.colors.text}
                />
                <Text className={"text-xs text-text"}>标签</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={"items-center gap-2"}
                onPress={() => setShowRemarkInput(!showRemarkInput)}
              >
                <Icon
                  name={"create-outline"}
                  size={18}
                  color={tw.colors.text}
                />
                <Text className={"text-xs text-text"}>添加备注</Text>
              </TouchableOpacity>
            </View>
            <Text className={"text-2xl font-medium leading-9"}>{amount}</Text>
          </View>

          {/* 备注输入 */}
          {showRemarkInput && (
            <View className={"flex-col gap-1.5"}>
              <Text className={"text-xs text-text"}>备注</Text>
              <Text className={"text-xs text-text"}>
                {remark || "点击输入备注"}
              </Text>
            </View>
          )}

          {/* 工具栏 */}
          <View className={"flex-row gap-4"}>
            <TouchableOpacity className={"items-center gap-2"}>
              <Icon
                name={"calendar-outline"}
                size={16}
                color={tw.colors.text}
              />
              <Text className={"text-xs text-text"}>今天</Text>
            </TouchableOpacity>
            <TouchableOpacity className={"items-center gap-2"}>
              <Icon
                name={"diamond-outline"}
                size={16}
                color={tw.colors.primary}
              />
              <Text className={"text-xs text-text"}>零钱通</Text>
            </TouchableOpacity>
            <TouchableOpacity className={"items-center gap-2"}>
              <Icon name={"receipt-outline"} size={16} color={tw.colors.text} />
              <Text className={"text-xs text-text"}>不报销</Text>
            </TouchableOpacity>
            <TouchableOpacity className={"items-center gap-2"}>
              <Icon name={"attach-outline"} size={16} color={tw.colors.text} />
              <Text className={"text-xs text-text"}>附件</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 h-14 bg-white border border-border items-center justify-center">
              <Icon
                name={"pricetag-outline"}
                size={16}
                color={tw.colors.text}
              />
              <Text className="text-xs text-text">优惠</Text>
            </TouchableOpacity>
          </View>

          {/* 数字键盘 */}
          <View className={"flex-row flex-wrap gap-2"}>
            {/* 第一行 */}
            <TouchableOpacity
              className="flex-1 h-14 bg-white border border-border items-center justify-center"
              onPress={() => handleNumberPress("7")}
            >
              <Text className="text-xl font-medium text-text">7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 h-14 bg-white border border-border items-center justify-center"
              onPress={() => handleNumberPress("8")}
            >
              <Text className="text-xl font-medium text-text">8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 h-14 bg-white border border-border items-center justify-center"
              onPress={() => handleNumberPress("9")}
            >
              <Text className="text-xl font-medium text-text">9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 h-14 bg-white border border-border items-center justify-center"
              onPress={handleBackspace}
            >
              <Icon
                name={"backspace-outline"}
                size={24}
                color={tw.colors.text}
              />
            </TouchableOpacity>

            {/* 第二行 */}
            <TouchableOpacity
              className="flex-1 h-14 bg-white border border-border items-center justify-center"
              onPress={() => handleNumberPress("4")}
            >
              <Text className="text-xl font-medium text-text">4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 h-14 bg-white border border-border items-center justify-center"
              onPress={() => handleNumberPress("5")}
            >
              <Text className="text-xl font-medium text-text">5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 h-14 bg-white border border-border items-center justify-center"
              onPress={() => handleNumberPress("6")}
            >
              <Text className="text-xl font-medium text-text">6</Text>
            </TouchableOpacity>
            <View className="flex-1 flex-col">
              <TouchableOpacity
                className="flex-1 bg-muted border border-border items-center justify-center"
                onPress={() => handleNumberPress("+")}
              >
                <Text className="text-base font-medium text-text">+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-muted border border-border items-center justify-center"
                onPress={() => handleNumberPress("-")}
              >
                <Text className="text-base font-medium text-text">-</Text>
              </TouchableOpacity>
            </View>

            {/* 第三行 */}
            <TouchableOpacity
              className="flex-1 h-14 bg-white border border-border items-center justify-center"
              onPress={() => handleNumberPress("1")}
            >
              <Text className="text-xl font-medium text-text">1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 h-14 bg-white border border-border items-center justify-center"
              onPress={() => handleNumberPress("2")}
            >
              <Text className="text-xl font-medium text-text">2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 h-14 bg-white border border-border items-center justify-center"
              onPress={() => handleNumberPress("3")}
            >
              <Text className="text-xl font-medium text-text">3</Text>
            </TouchableOpacity>
            <View className="flex-1 flex-col">
              <TouchableOpacity
                className="flex-1 bg-muted border border-border items-center justify-center"
                onPress={() => handleNumberPress("×")}
              >
                <Text className="text-base font-medium text-text">×</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-muted border border-border items-center justify-center"
                onPress={() => handleNumberPress("÷")}
              >
                <Text className="text-base font-medium text-text">÷</Text>
              </TouchableOpacity>
            </View>

            {/* 第四行 */}
            <TouchableOpacity
              className="flex-1 h-14 bg-white border border-border items-center justify-center"
              onPress={() => handleNumberPress("C")}
            >
              <Text className="text-xl font-medium text-text">再记</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 h-14 bg-white border border-border items-center justify-center"
              onPress={() => handleNumberPress("0")}
            >
              <Text className="text-xl font-medium text-text">0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 h-14 bg-white border border-border items-center justify-center"
              onPress={() => handleNumberPress(".")}
            >
              <Text className="text-xl font-medium text-text">.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 h-14 bg-muted border border-border items-center justify-center"
              onPress={handleCancel}
            >
              <Text className="text-xl font-medium text-text">取消</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LayoutComponent.Content>
    </LayoutComponent>
  );
}
