import React from "react";
import ComponentOne from "../components/componentOne";
import { Text, View } from "react-native";
import { useConnectivity } from "../hooks/useConnectivity";
import OfflineToast from "../components/OfflineToast";
type Props = {};

const AnotherScreen = (props: Props) => {
  const isConnected = useConnectivity();
  return (
    <View className=" flex-1 align-middle justify-center">
      <Text className="text-lg">Placeholder for</Text>
      <ComponentOne />
      <View className="flex-1 align-middle justify-end">
        <OfflineToast />
      </View>
    </View>
  );
};

export default AnotherScreen;
