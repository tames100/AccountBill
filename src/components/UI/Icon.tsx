import {
  Ionicons
} from '@expo/vector-icons';
import { IconName } from "@/types/icon";
import { tw } from "@/constants/theme";

interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
}

export default function Icon({ name, color, size }: IconProps) {

  return <Ionicons
    name={ name }
    color={ color ?? tw.colors.primary }
    size={ size ?? 24 }
    strokeWidth={ 2 }
  />;
};
