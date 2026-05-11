import { Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width - 32;
const screenHeight = Dimensions.get('window').height;

export {
  screenWidth,
  screenHeight,
}