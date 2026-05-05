import { colors } from "@/constants/theme";
import { useTransactionStore } from "@/stores";
import { TransactionType } from "@/types/transaction";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddBill() {
  const router = useRouter();
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [remark, setRemark] = useState("");
  const [account, setAccount] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSave = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("请输入有效金额");
      return;
    }

    addTransaction({
      amount: parseFloat(amount),
      type,
      categoryId: categoryId || "default",
      remark,
      account: account || "默认账户",
      createTime: new Date(),
      updateTime: new Date(),
    });

    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>取消</Text>
        </TouchableOpacity>
        <Text style={styles.title}>新增账单</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>保存</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <ScrollView style={styles.form}>
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === "expense" && styles.typeButtonActive,
              ]}
              onPress={() => setType("expense")}
            >
              <Text
                style={[
                  styles.typeText,
                  type === "expense" && styles.typeTextActive,
                ]}
              >
                支出
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === "income" && styles.typeButtonActive,
              ]}
              onPress={() => setType("income")}
            >
              <Text
                style={[
                  styles.typeText,
                  type === "income" && styles.typeTextActive,
                ]}
              >
                收入
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === "transfer" && styles.typeButtonActive,
              ]}
              onPress={() => setType("transfer")}
            >
              <Text
                style={[
                  styles.typeText,
                  type === "transfer" && styles.typeTextActive,
                ]}
              >
                转账
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>金额</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>账户</Text>
            <TextInput
              style={styles.input}
              placeholder="例如：微信、支付宝、银行卡"
              value={account}
              onChangeText={setAccount}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>备注</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="添加备注信息"
              value={remark}
              onChangeText={setRemark}
              multiline
              numberOfLines={3}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    fontSize: 16,
    color: colors.text,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  saveButton: {
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  saveText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  form: {
    flex: 1,
    padding: 16,
  },
  typeSelector: {
    flexDirection: "row",
    marginBottom: 24,
    // backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
  },
  typeText: {
    fontSize: 16,
    color: colors.text,
  },
  typeTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.cardText,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
});
