
import React from 'react';
import {View} from 'react-native';

interface EmptyStateProps {
}

/**
 * 组件介绍
 * @param props
 * @constructor
 */
export default function EmptyState(props: EmptyStateProps) {
  const {} = props;
  const title = "123";

  return (
    <View>{title}</View>
  );
}