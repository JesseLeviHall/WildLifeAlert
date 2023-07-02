import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import NightGradAnimated from "../../components/background/NightGradAnimated";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";
import SignUpWithOAuth from "../../components/SignUpWithOAuth";
import SignUpComponent from "../../components/SignUpComponent";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

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
      headerShown: false,
    });
  });

  return (
    <ImageBackground
      source={require("../../assets/resbasecamp.png")}
      style={{
        height: screenHeight,
        width: screenWidth,
        margin: 0,
        padding: 0,
        alignItems: "center",
      }}
    >
      <View style={styles.background}>
        <NightGradAnimated />
      </View>
      <View style={styles.box}>
        <SignUpWithOAuth />
        <SignUpComponent />
        <TouchableOpacity
          className="border rounded-md w-full border-[#00E0FFFF] p-3 mb-4"
          onPress={() => {
            navigation.navigate("RescuerWelcome");
          }}
        >
          <Text className="text-blue-200 text-center text-base font-bold">
            Complete Registration
          </Text>
        </TouchableOpacity>
        {isConnected ? null : (
          <View className="flex-1 align-middle justify-end">
            <OfflineToast />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default RescuerRegisterStepTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    zIndex: -10,
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight / 4.5,
    paddingHorizontal: 15,
    backgroundColor: "rgba(0, 224, 255, 0.3)",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight / 2.4,
    borderWidth: 1,
    borderColor: "#00E0FFFF",
  },
});
