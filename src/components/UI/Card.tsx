
import React from 'react';
import {View} from 'react-native';

interface CardProps {
}

/**
 * 组件介绍
 * @param props
 * @constructor
 */
export default function Card(props: CardProps) {
  const {} = props;
  const title = "123";

  return (
    <View>{title}</View>
  );
}