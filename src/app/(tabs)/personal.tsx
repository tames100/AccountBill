
import React from 'react';
import {View} from 'react-native';

interface PersonalProps {
}

/**
 * 组件介绍
 * @param props
 * @constructor
 */
export default function Personal(props: PersonalProps) {
  const {} = props;
  const title = "123";

  return (
    <View>{title}</View>
  );
}