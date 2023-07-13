import React from "react";
import { View, Text } from "react-native";

type Props = {};

const ActiveGlobal = (props: Props) => {
  return (
    <View className="h-24 w-64 mt-5 bg-[#00C5E021] items-center rounded-xl">
      <Text className="text-[#A6D4FF] mt-1 text-5xl">0</Text>
      <Text className="text-[#A6D4FF] text-base">Global Alerts</Text>
      <Text className="text-[#A6D4FF] font-light">Active Now</Text>
    </View>
  );
};

export default ActiveGlobal;
