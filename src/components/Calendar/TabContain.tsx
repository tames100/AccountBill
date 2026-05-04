import {Platform, StyleSheet, Text, View} from "react-native";
import {colors} from "@/constants/theme";

function TabContain() {
  return (
    <View style={ styles.header }>
      <Text style={ styles.title }> 日历 </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    color: colors.foreground,
    marginBottom: 16,
  },
})

export default TabContain