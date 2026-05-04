
import React from 'react';
import {View} from 'react-native';

interface HomeContainerProps {
}

/**
 * 组件介绍
 * @param props
 * @constructor
 */
export default function HomeContainer(props: HomeContainerProps) {
  const {} = props;
  const title = "123";

  return (
    <View>{title}</View>
  );
}