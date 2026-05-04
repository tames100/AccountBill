
import React from 'react';
import {View} from 'react-native';

interface HomeProps {
}

/**
 * 组件介绍
 * @param props
 * @constructor
 */
export default function Home(props: HomeProps) {
  const {} = props;
  const title = "123";

  return (
    <View>{title}</View>
  );
}