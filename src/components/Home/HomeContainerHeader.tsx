
import React from 'react';
import {View} from 'react-native';

interface HomeContainerHeaderProps {
}

/**
 * 组件介绍
 * @param props
 * @constructor
 */
export default function HomeContainerHeader(props: HomeContainerHeaderProps) {
  const {} = props;
  const title = "123";

  return (
    <View>{title}</View>
  );
}