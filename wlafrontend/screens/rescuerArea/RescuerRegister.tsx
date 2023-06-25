import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";

type RootStackParamList = {
  RescuerRegisterStepTwo: undefined;
};

type RescuerRegisterStepTwoProp = NavigationProp<
  RootStackParamList,
  "RescuerRegisterStepTwo"
>;

type Props = {
  navigation: RescuerRegisterStepTwoProp;
};

const RescuerRegister = (props: Props) => {
  const navigation = useNavigation<RescuerRegisterStepTwoProp>();
  const isConnected = useConnectivity();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Basic Info",
      headerTintColor: "#000000",
      headerStyle: { backgroundColor: "#71D1C7" },
    });
  });
  return (
    <View>
      <Text>RescuerRegister Step 1</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RescuerRegisterStepTwo");
        }}
      >
        <Text>Next</Text>
      </TouchableOpacity>
      {isConnected ? null : (
        <View className="flex-1 align-middle justify-end">
          <OfflineToast />
        </View>
      )}
    </View>
  );
};

export default RescuerRegister;
