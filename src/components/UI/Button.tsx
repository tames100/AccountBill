import React from 'react';
import { TouchableOpacity } from 'react-native';
import { twMerge } from "tailwind-merge";
import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";

interface ButtonProps {
  activeOpacity?: number;
  className?: string;
  onPress?: (e: GestureResponderEvent) => void;
  children?: React.ReactNode;
}

export default function Button({ activeOpacity = 0.9, className, onPress, children }: ButtonProps) {

  const defaultClassName = "bg-primary rounded-2xl flex-1 items-center justify-center mb-4 h-16";

  const mergeClassName = twMerge(defaultClassName, className)

  return (
    <TouchableOpacity
      className={ mergeClassName }
      activeOpacity={ activeOpacity }
      onPress={ onPress }>
      { children }
    </TouchableOpacity>
  );
}