
import React from 'react';
import {View} from 'react-native';

interface ButtonProps {
}

/**
 * 组件介绍
 * @param props
 * @constructor
 */
export default function Button(props: ButtonProps) {
  const {} = props;
  const title = "123";

  return (
    <View>{title}</View>
  );
}