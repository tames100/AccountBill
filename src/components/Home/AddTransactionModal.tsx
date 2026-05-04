import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/theme";

function  AddTransactionModal()
{
  return (
    <View style={ styles.modalOverlay }>
      <View>
        <TouchableOpacity style={ styles.modalClose } activeOpacity={0.8}>
          <Text style={ styles.modalCloseText }>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    bottom: 40,
    right: 40,
    display: "flex",
    width: 64,
    height:64,
    zIndex: 100,
  },
  modal: {
    position: "absolute",
    bottom: 40,
    right: 10,
  },
  modalClose: {
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCloseText: {
    fontSize: 40,
    color: colors.primaryText,
  },
})

export default AddTransactionModal;