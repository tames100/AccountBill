import { colors } from "@/constants/theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
    <View style={ styles.header }>
      {/* 账本选择 */ }
      <View style={ styles.headerLeft }>
        <TouchableOpacity activeOpacity={0.9}>
          <View style={ styles.bill }>
            <Icon name={"wallet"} />
            <Text style={ { fontSize: 18, fontWeight: 500, color: colors.ring } }>生活日常</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={ styles.action }>
        <TouchableOpacity activeOpacity={0.9}>
          <View style={ styles.icon }>
            <Icon name={"search"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9}>
          <View style={ styles.icon }>
            <Icon name={"ellipsis-vertical"} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
      width: "100%",
      height: 30,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerLeft: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",

    },
    bill: {
      display: "flex",
      flexDirection: "row",
      gap: 10
    },
    action: {
      flex: 2,
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 10
    },
    icon: {
      flexDirection: "row",
      gap: 10,

    }
  }
)

export default TabHeader;