import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";
import NightGradAnimated from "../../components/background/NightGradAnimated";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import SignInWithOAuth from "../../components/SignInWithOAuth";
import SignInComponent from "../../components/SignInComponent";
import LoggedInChips from "../../components/resuerloginscreenlayout/LoggedInChips";
import AlertsInYourArea from "../../components/resuerloginscreenlayout/AlertsInYourArea";
import { Button } from "native-base";
import SpinnerComp from "../../components/Spinner";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type RootStackParamList = {
  RescuerRegister: undefined;
  PublicMap: undefined;
  Home: undefined;
  RescuerPrefs: undefined;
  ForgotPassword: undefined;
};
type RescuerRegisterNavigationProp = NavigationProp<
  RootStackParamList,
  "RescuerRegister"
>;

type Props = {
  navigation: RescuerRegisterNavigationProp;
};

const RescuerLogin = (Props: Props) => {
  const navigation = useNavigation<RescuerRegisterNavigationProp>();
  const isConnected = useConnectivity();
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return <SpinnerComp />;
  }

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
      <View className="mt-16 mb-12 h-9 w-60 border border-blue-50 align-middle justify-center items-center  bg-[#24008CFF] rounded-xl">
        <Text className="font-bold text-lg text-blue-50 text-center">
          Base Camp
        </Text>
      </View>
      <SignedIn>
        <View style={styles.box}>
          <Text className="text-center text-blue-200 text-lg font-bold">
            Hello,{" "}
            {user?.firstName
              ? user.firstName
              : user?.primaryEmailAddress?.emailAddress}
          </Text>
          <View>
            <AlertsInYourArea />
          </View>
          <LoggedInChips navigation={navigation} />
        </View>
      </SignedIn>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SignedOut>
          <View style={styles.box}>
            <SignInWithOAuth />
            <SignInComponent />
            <TouchableOpacity
              className="mb-6"
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text className="text-blue-300 text-sm">Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-2"
              onPress={() => {
                navigation.navigate("RescuerRegister");
              }}
            >
              <Text className="text-blue-200 text-base font-bold">
                New? Sign Up Here!
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            onPress={navigation.goBack}
            className="w-24 absolute bottom-32 border self-center border-cyan-500 "
          >
            Back
          </Button>
        </SignedOut>
      </TouchableWithoutFeedback>
      {isConnected ? null : (
        <View className="flex-1 align-middle justify-end">
          <OfflineToast />
        </View>
      )}
    </ImageBackground>
  );
};

export default RescuerLogin;

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
    marginTop: 25,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0, 224, 255, 0.3)",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight / 1.8,
    borderWidth: 1,
    borderColor: "#00E0FFFF",
  },
});
