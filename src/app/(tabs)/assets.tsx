
import React from 'react';
import {View} from 'react-native';

interface AssetsProps {
}

/**
 * 组件介绍
 * @param props
 * @constructor
 */
export default function Assets(props: AssetsProps) {
  const {} = props;
  const title = "123";

  return (
    <View>{title}</View>
  );
}