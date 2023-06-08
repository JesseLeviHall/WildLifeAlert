import React from "react";
import { View, Text } from "react-native";
type Props = {};

const OfflineToast = (props: Props) => {
  return (
    <View className=" items-center justify-end rounded-2xl bg-[#bad1e8] opacity-60 mb-32">
      <Text className="tex-xl font-bold text-center m-2 p-2">
        Network Connectivity Problems Detected! You can still post an Alert, and
        when connection resumes the data will sync automatically.
      </Text>
    </View>
  );
};

export default OfflineToast;
