import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";

type RootStackParamList = {
  RescuerLogin: undefined;
};
type RescuerLoginNavigationProp = NavigationProp<
  RootStackParamList,
  "RescuerLogin"
>;
type Props = {
  navigation: RescuerLoginNavigationProp;
};

const RescuerWelcome = (props: Props) => {
  const navigation = useNavigation<RescuerLoginNavigationProp>();
  const isConnected = useConnectivity();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <View className="mt-24">
      <Text>RescuerWelcome</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RescuerLogin");
        }}
      >
        <Text>Done</Text>
      </TouchableOpacity>
      {isConnected ? null : (
        <View className="flex-1 align-middle justify-end">
          <OfflineToast />
        </View>
      )}
    </View>
  );
};

export default RescuerWelcome;
