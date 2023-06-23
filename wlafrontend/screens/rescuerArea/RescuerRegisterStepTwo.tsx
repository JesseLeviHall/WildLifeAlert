import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";
import SignUpWithOAuth from "../../components/SignUpWithOAuth";
import SignUpComponent from "../../components/SignUpComponent";

type RootStackParamList = {
  RescuerWelcome: undefined;
};

type RescuerWelcomeProp = NavigationProp<RootStackParamList, "RescuerWelcome">;

type Props = {
  navigation: RescuerWelcomeProp;
};

const RescuerRegisterStepTwo = (props: Props) => {
  const navigation = useNavigation<RescuerWelcomeProp>();
  const isConnected = useConnectivity();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Authentication",
      headerTintColor: "#000000",
      headerStyle: { backgroundColor: "#71D1C7" },
    });
  });

  return (
    <View>
      <Text>RescuerRegister Step 2</Text>
      <View className="mt-2 h-16">
        <SignUpWithOAuth />
      </View>
      <View className="mt-2 h-36">
        <SignUpComponent />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RescuerWelcome");
        }}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
      {isConnected ? null : (
        <View className="flex-1 align-middle justify-end">
          <OfflineToast />
        </View>
      )}
    </View>
  );
};

export default RescuerRegisterStepTwo;
