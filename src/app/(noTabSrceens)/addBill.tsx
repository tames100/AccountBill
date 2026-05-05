import { LayoutComponent } from "@/components/Common";
import { Icon } from "@/components/UI";
import { colors } from "@/constants/theme";
import { useTransactionStore } from "@/stores";
import { TransactionType } from "@/types/transaction";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
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
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel} style={styles.headerLeft}>
            <Icon name={"chevron-back-outline"} size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.typeTabs}>
            {["expense", "income", "transfer", "debt"].map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setType(t as TransactionType)}
                style={styles.typeTab}
              >
                <Text
                  style={[
                    styles.typeTabText,
                    type === t && styles.typeTabTextActive,
                  ]}
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
          <View style={styles.headerRight}>
            <Text style={styles.billName}>生活日常</Text>
          </View>
        </View>
      </LayoutComponent.Header>
      <LayoutComponent.Content>
        <View style={styles.content}>
          {/* 主分类 */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.mainCategoryScroll}
          >
            <View style={styles.mainCategoryContainer}>
              {mainCategories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => {
                    setSelectedMainCategory(cat.id);
                    setSelectedSubCategory("");
                  }}
                  style={[
                    styles.mainCategoryItem,
                    selectedMainCategory === cat.id &&
                      styles.mainCategoryItemActive,
                  ]}
                >
                  <View
                    style={[
                      styles.mainCategoryIcon,
                      selectedMainCategory === cat.id &&
                        styles.mainCategoryIconActive,
                    ]}
                  >
                    <Icon
                      name={cat.icon as any}
                      size={24}
                      color={
                        selectedMainCategory === cat.id ? "#fff" : colors.text
                      }
                    />
                  </View>
                  <Text
                    style={[
                      styles.mainCategoryText,
                      selectedMainCategory === cat.id &&
                        styles.mainCategoryTextActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* 子分类网格 */}
          <ScrollView style={styles.subCategoryScroll}>
            <View style={styles.subCategoryGrid}>
              {currentSubCategories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedSubCategory(cat.id)}
                  style={[
                    styles.subCategoryItem,
                    selectedSubCategory === cat.id &&
                      styles.subCategoryItemActive,
                  ]}
                >
                  <View style={styles.subCategoryIcon}>
                    <Icon
                      name={cat.icon as any}
                      size={20}
                      color={
                        selectedSubCategory === cat.id
                          ? colors.primary
                          : colors.text
                      }
                    />
                  </View>
                  <Text
                    style={[
                      styles.subCategoryText,
                      selectedSubCategory === cat.id &&
                        styles.subCategoryTextActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* 底部操作栏 */}
          <View style={styles.bottomBar}>
            <View style={styles.bottomLeft}>
              <TouchableOpacity style={styles.bottomAction}>
                <Icon name={"pricetag-outline"} size={18} color={colors.text} />
                <Text style={styles.bottomActionText}>标签</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottomAction}
                onPress={() => setShowRemarkInput(!showRemarkInput)}
              >
                <Icon name={"create-outline"} size={18} color={colors.text} />
                <Text style={styles.bottomActionText}>添加备注</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.amountDisplay}>{amount}</Text>
          </View>

          {/* 备注输入 */}
          {showRemarkInput && (
            <View style={styles.remarkInput}>
              <Text style={styles.remarkLabel}>备注</Text>
              <Text style={styles.remarkValue}>{remark || "点击输入备注"}</Text>
            </View>
          )}

          {/* 工具栏 */}
          <View style={styles.toolbar}>
            <TouchableOpacity style={styles.toolbarItem}>
              <Icon name={"calendar-outline"} size={16} color={colors.text} />
              <Text style={styles.toolbarText}>今天</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarItem}>
              <Icon name={"diamond-outline"} size={16} color={colors.primary} />
              <Text style={styles.toolbarText}>零钱通</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarItem}>
              <Icon name={"receipt-outline"} size={16} color={colors.text} />
              <Text style={styles.toolbarText}>不报销</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarItem}>
              <Icon name={"attach-outline"} size={16} color={colors.text} />
              <Text style={styles.toolbarText}>附件</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarItem}>
              <Icon name={"pricetag-outline"} size={16} color={colors.text} />
              <Text style={styles.toolbarText}>优惠</Text>
            </TouchableOpacity>
          </View>

          {/* 数字键盘 */}
          <View style={styles.keyboard}>
            {/* 第一行 */}
            <TouchableOpacity
              style={styles.key}
              onPress={() => handleNumberPress("7")}
            >
              <Text style={styles.keyText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.key}
              onPress={() => handleNumberPress("8")}
            >
              <Text style={styles.keyText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.key}
              onPress={() => handleNumberPress("9")}
            >
              <Text style={styles.keyText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.key, styles.keyGray]}
              onPress={handleBackspace}
            >
              <Icon name={"backspace-outline"} size={24} color={colors.text} />
            </TouchableOpacity>

            {/* 第二行 */}
            <TouchableOpacity
              style={styles.key}
              onPress={() => handleNumberPress("4")}
            >
              <Text style={styles.keyText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.key}
              onPress={() => handleNumberPress("5")}
            >
              <Text style={styles.keyText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.key}
              onPress={() => handleNumberPress("6")}
            >
              <Text style={styles.keyText}>6</Text>
            </TouchableOpacity>
            <View style={styles.keyColumn}>
              <TouchableOpacity
                style={[styles.keySmall, styles.keyGray]}
                onPress={() => handleNumberPress("+")}
              >
                <Text style={styles.keyTextSmall}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.keySmall, styles.keyGray]}
                onPress={() => handleNumberPress("-")}
              >
                <Text style={styles.keyTextSmall}>-</Text>
              </TouchableOpacity>
            </View>

            {/* 第三行 */}
            <TouchableOpacity
              style={styles.key}
              onPress={() => handleNumberPress("1")}
            >
              <Text style={styles.keyText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.key}
              onPress={() => handleNumberPress("2")}
            >
              <Text style={styles.keyText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.key}
              onPress={() => handleNumberPress("3")}
            >
              <Text style={styles.keyText}>3</Text>
            </TouchableOpacity>
            <View style={styles.keyColumn}>
              <TouchableOpacity
                style={[styles.keySmall, styles.keyGray]}
                onPress={() => handleNumberPress("×")}
              >
                <Text style={styles.keyTextSmall}>×</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.keySmall, styles.keyGray]}
                onPress={() => handleNumberPress("÷")}
              >
                <Text style={styles.keyTextSmall}>÷</Text>
              </TouchableOpacity>
            </View>

            {/* 第四行 */}
            <TouchableOpacity
              style={styles.key}
              onPress={() => handleNumberPress("C")}
            >
              <Text style={styles.keyText}>再记</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.key}
              onPress={() => handleNumberPress("0")}
            >
              <Text style={styles.keyText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.key}
              onPress={() => handleNumberPress(".")}
            >
              <Text style={styles.keyText}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.key, styles.keyGray]}
              onPress={handleCancel}
            >
              <Text style={styles.keyText}>取消</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LayoutComponent.Content>
    </LayoutComponent>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.screenBackground,
  },
  headerLeft: {
    padding: 4,
  },
  typeTabs: {
    flexDirection: "row",
    gap: 16,
  },
  typeTab: {
    paddingVertical: 4,
  },
  typeTabText: {
    fontSize: 16,
    color: colors.mutedText,
    fontWeight: "400",
  },
  typeTabTextActive: {
    color: colors.text,
    fontWeight: "600",
  },
  headerRight: {
    padding: 4,
  },
  billName: {
    fontSize: 14,
    color: colors.mutedText,
  },
  content: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  mainCategoryScroll: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  mainCategoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 16,
  },
  mainCategoryItem: {
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
  },
  mainCategoryItemActive: {},
  mainCategoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  mainCategoryIconActive: {
    backgroundColor: colors.primary,
  },
  mainCategoryText: {
    fontSize: 12,
    color: colors.text,
  },
  mainCategoryTextActive: {
    color: colors.primary,
    fontWeight: "500",
  },
  subCategoryScroll: {
    flex: 1,
  },
  subCategoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 8,
  },
  subCategoryItem: {
    width: (width - 48) / 5,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
  },
  subCategoryItemActive: {
    backgroundColor: `${colors.primary}15`,
  },
  subCategoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  subCategoryText: {
    fontSize: 11,
    color: colors.text,
    textAlign: "center",
  },
  subCategoryTextActive: {
    color: colors.primary,
    fontWeight: "500",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.screenBackground,
  },
  bottomLeft: {
    flexDirection: "row",
    gap: 16,
  },
  bottomAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bottomActionText: {
    fontSize: 12,
    color: colors.mutedText,
  },
  amountDisplay: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.expense,
  },
  remarkInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  remarkLabel: {
    fontSize: 12,
    color: colors.mutedText,
    marginRight: 8,
  },
  remarkValue: {
    fontSize: 12,
    color: colors.text,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 4,
  },
  toolbarItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  toolbarText: {
    fontSize: 11,
    color: colors.mutedText,
  },
  keyboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: colors.screenBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  key: {
    width: "25%",
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  keyText: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.text,
  },
  keyGray: {
    backgroundColor: colors.secondary,
  },
  keyColumn: {
    width: "25%",
    height: 56,
  },
  keySmall: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: colors.border,
    backgroundColor: colors.secondary,
  },
  keyTextSmall: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
  },
});
