import {Text, View} from "react-native";

/**
 * 空状态
 * @constructor
 */
export default function EmptyState({icon, title, description}: { icon: string; title: string; description: string }) {
  return (
    <View style={ {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32} }>
      {/*<Icon name={ icon } size={ 64 } color="#ececf0"/>*/ }
      <Text style={ {fontSize: 16, fontWeight: '500', color: '#717182', marginTop: 16} }>{ title }</Text>
      <Text style={ {fontSize: 14, color: '#717182', marginTop: 8} }>{ description }</Text>
    </View>
  );
}
