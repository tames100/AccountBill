import {
  Ionicons
} from '@expo/vector-icons';
import { colors } from "@/constants/theme";
import { IconName } from "@/types/icon";

interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
}

export default function Icon({ name, color, size }: IconProps) {

  return <Ionicons
    name={name}
    color={ color ?? colors.primary }
    size={ size ?? 24 }
    strokeWidth={ 2 }
  />;
};
