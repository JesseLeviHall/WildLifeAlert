import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Platform,
} from "react-native";
import NightGradAnimated from "../../components/background/NightGradAnimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Motion } from "@legendapp/motion";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigationtypes";
import SignInWithOAuth from "../../components/SignInWithOAuth";
import SignInWithApple from "../../components/SignInWithApple";
import SignInComponent from "../../components/SignInComponent";
import LoggedInChips from "../../components/resuerloginscreenlayout/LoggedInChips";
import AlertsInYourArea from "../../components/resuerloginscreenlayout/AlertsInYourArea";
import ActiveGlobal from "../../components/resuerloginscreenlayout/ActiveGlobal";
import ConditionalSafeAreaView from "../../components/ConditionalSafeArea";
import { Button } from "native-base";
import SpinnerComp from "../../components/Spinner";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type RescuerLoginNavigationProp = NavigationProp<RootStackParamList>;

type Props = {
  navigation: RescuerLoginNavigationProp;
};

const RescuerLogin = (props: Props) => {
  const [signInTap, setSignInTap] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const navigation = useNavigation<RescuerLoginNavigationProp>();
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

  const isIPhoneSE = screenHeight < 844 ? true : false;

  return (
    <ConditionalSafeAreaView>
      {isConnected ? (
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
          <View className="mt-16 mb-12 h-9 w-48 border border-blue-50 align-middle justify-center items-center  bg-[#24008CFF] rounded-xl">
            <Text className="font-bold text-lg text-blue-50 text-center">Base Camp</Text>
          </View>
          <SignedIn>
            <View style={isIPhoneSE ? styles.smallBox : styles.box}>
              <Text className="text-center text-blue-100 text-lg mt-2 font-thin">
                Hello, {user?.firstName ? user.firstName : user?.primaryEmailAddress?.emailAddress}
              </Text>
              <View>
                <AlertsInYourArea navigation={props.navigation} />
                <ActiveGlobal />
              </View>
              <LoggedInChips navigation={props.navigation} />
            </View>
          </SignedIn>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SignedOut>
              {!signInTap && (
                <View style={isIPhoneSE ? styles.smallFirstBox : styles.firstBox}>
                  <TouchableOpacity
                    className=" border w-full border-[#00E0FFFF] bg-[#26FF000A] rounded-lg h-48 justify-center items-center"
                    onPress={() => {
                      setSignInTap(!signInTap);
                    }}
                  >
                    <MaterialCommunityIcons
                      style={{ marginTop: -4 }}
                      name="account-check"
                      size={32}
                      color="#00E0FFFF"
                    />
                    <Text className="text-blue-200 text-lg font-bold ">Have an account? Sign In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className=" border w-full border-[#00E0FFFF] bg-[#1400FF11] rounded-lg h-48 justify-center items-center"
                    onPress={() => {
                      navigation.navigate("RescuerRegister");
                    }}
                  >
                    <MaterialCommunityIcons style={{ marginTop: -4 }} name="account-plus" size={32} color="#00E0FFFF" />
                    <Text className="text-blue-200 text-lg font-bold ">New? Sign Up Here!</Text>
                  </TouchableOpacity>
                </View>
              )}
              {signInTap && (
                <Motion.View
                  key={animationKey}
                  initial={{ x: -100, scale: 1, opacity: 0.1 }}
                  animate={{ x: 0, scale: 1, opacity: 1 }}
                  transition={{
                    default: {
                      type: "spring",
                      damping: 30,
                      stiffness: 600,
                    },
                    x: {
                      type: "spring",
                      damping: 30,
                      stiffness: 600,
                    },
                    opacity: {
                      type: "tween",
                      duration: 900,
                    },
                  }}
                  style={isIPhoneSE ? styles.smallBox : styles.box}
                >
                  {Platform.OS === "ios" && <SignInWithApple />}
                  <SignInWithOAuth />
                  <SignInComponent />
                  <TouchableOpacity className="mb-6" onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text className="text-blue-300 text-sm">Forgot password?</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="mb-2 w-full  h-12 justify-center items-center"
                    onPress={() => {
                      navigation.navigate("RescuerRegister");
                    }}
                  >
                    <Text className="text-blue-200 text-md font-bold ">New? Sign Up Here!</Text>
                  </TouchableOpacity>
                </Motion.View>
              )}
              <Button onPress={navigation.goBack} className="w-24 mt-6 border self-center border-cyan-500 ">
                Back
              </Button>
            </SignedOut>
          </TouchableWithoutFeedback>
        </ImageBackground>
      ) : (
        <View className="flex-1 align-middle justify-end">
          <OfflineToast />
          <Button onPress={navigation.goBack} className="w-24 mt-6 border self-center border-cyan-500 ">
            Back
          </Button>
        </View>
      )}
    </ConditionalSafeAreaView>
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
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0, 224, 255, 0.3)",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight - 350,
  },
  smallBox: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: -30,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0, 224, 255, 0.3)",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight - 200,
  },
  firstBox: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 12,
    backgroundColor: "transparent",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight - 350,
  },
  smallFirstBox: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: -30,
    paddingHorizontal: 12,
    backgroundColor: "transparent",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight - 200,
  },
});
