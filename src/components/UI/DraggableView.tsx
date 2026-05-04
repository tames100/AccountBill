import React from 'react';
import { Animated, View, ViewStyle } from 'react-native';
import { useGesture } from "@/hooks";
import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle
}

/**
 * 自由拖动
 */
export const Draggable = ({ children, style }: Props) => {
  const { panHandlers, translateX, translateY } = useGesture('both', 'drag');
  return (
    <View style={ {
      width: "100%",
      overflow: "hidden"
    } }> <Animated.View
      { ...panHandlers }
      style={ [style, { transform: [{ translateX }, { translateY }] }] }
    >
      { children }
    </Animated.View>
    </View>
  );
};

/**
 * 仅水平拖动
 */
export const DraggableX = ({ children, style }: Props) => {
  const { panHandlers, translateX } = useGesture('x', 'drag');
  return (
    <View style={ {
      width: "100%",
      overflow: "hidden"
    } }>
      <Animated.View
        { ...panHandlers }
        style={ [style, { transform: [{ translateX }] }] }
      >
        { children }
      </Animated.View>
    </View>
  );
};

/**
 * 仅垂直拖动
 */
export const DraggableY = ({ children, style }: Props) => {
  const { panHandlers, translateY } = useGesture('y', 'drag');
  return (
    <View style={ {
      width: "100%",
      overflow: "hidden"
    } }>
      <Animated.View
        { ...panHandlers }
        style={ [style, { transform: [{ translateY }] }] }
      >
        { children }
      </Animated.View>
    </View>
  )
    ;
};

type clickProps = Props & {
  onPress: (event: GestureResponderEvent) => void | undefined;
}

// 仅点击（不拖动）
export const TouchableView = ({ children, style, onPress }: clickProps) => {
  const { panHandlers } = useGesture('both', 'click');
  return (
    <View style={ {
      width: "100%",
      overflow: "hidden"
    } }>

      <Animated.View { ...panHandlers } style={ style } onTouchEnd={ onPress }>
        { children }
      </Animated.View>
    </View>
  );
}