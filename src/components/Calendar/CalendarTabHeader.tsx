import { Text, TouchableOpacity, View } from "react-native";
import { formatAmount } from "@/utils";
import { Icon } from "@/components/UI";
import { colors } from "@/constants/theme";

interface CalendarTabHeaderProps {
  year: number;
  month: number;
  selectedDate: Date;
  selectedDaySummary: { income: number; expense: number; balance: number };
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
  isCollapsed: boolean;
}

export default function CalendarTabHeader(props: CalendarTabHeaderProps) {
  const {
    year,
    month,
    selectedDate,
    selectedDaySummary,
    onPrevMonth,
    onNextMonth,
    onPrevWeek,
    onNextWeek,
    onToday,
    isCollapsed,
  } = props;

  return (
    <View className="flex-row justify-between items-center">
      <View>
        <Text className="text-xl font-semibold text-text">
          { year }年{ month }月
        </Text>
        <View className="flex-row justify-around">
          <View className="flex-row items-center">
            <Text className="text-xs text-text mr-1">收</Text>
            <Text className="text-xs text-income mr-2">
              { formatAmount(selectedDaySummary.income) }
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-xs text-text mr-1">支</Text>
            <Text className="text-xs text-expense mr-2">
              { formatAmount(selectedDaySummary.expense) }
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-xs text-text mr-1">余</Text>
            <Text
              className="text-xs mr-2"
              style={ {
                color:
                  selectedDaySummary.balance >= 0
                    ? colors.income
                    : colors.expense,
              } }
            >
              { formatAmount(selectedDaySummary.balance) }
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row">
        <TouchableOpacity onPress={ onToday }>
          <Text className="text-xl px-2">今</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="add-circle" size={ 28 } color={ colors.primary }/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="ellipsis-vertical" size={ 28 } color={ colors.text }/>
        </TouchableOpacity>
      </View>
    </View>
  );
}
