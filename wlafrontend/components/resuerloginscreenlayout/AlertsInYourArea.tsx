import React from "react";
import { View, Text } from "react-native";

type Props = {};

const AlertsInYourArea = (props: Props) => {
  return (
    <View className="h-24 w-64 mt-5 bg-[#00C5E021] items-center rounded-xl">
      <Text className="text-[#A6D4FF] text-5xl">0</Text>
      <Text className="text-[#A6D4FF] text-lg">Active Alerts</Text>
      <Text className="text-[#A6D4FF] font-light">In Your Area</Text>
    </View>
  );
};

export default AlertsInYourArea;
