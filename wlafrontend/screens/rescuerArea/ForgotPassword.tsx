import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import NightGradAnimated from "../../components/background/NightGradAnimated";
import SkeletonComp from "../../components/Skeleton";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type RootStackParamList = {
  RescuerLogin: undefined;
};
type RescuerLoginNavigationProp = NavigationProp<RootStackParamList, "RescuerLogin">;

type Props = {
  navigation: RescuerLoginNavigationProp;
};

const ForgotPassword = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = React.useState("");

  const { isLoaded, signIn, setActive } = useSignIn();
  const isConnected = useConnectivity();

  if (!isLoaded) {
    return <SkeletonComp />;
  }

  async function create() {
    if (!signIn) {
      // Handle error state, e.g. show an error message
      console.error("signIn is not defined");
      return;
    }
    await signIn
      .create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
      })
      .catch((err) => setError(err.errors[0].message));
  }

  async function reset() {
    if (!signIn || !setActive) {
      // Handle error state, e.g. show an error message
      console.error("signIn or setActive is not defined");
      return;
    }
    await signIn
      .attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
        } else if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          setComplete(true);
        } else {
          console.log(result);
        }
      })
      .catch((err) => setError(err.errors[0].message));
  }

  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <View className=" align-middle items-center">
          <View className="mt-16 mb-12 h-9 w-60 border border-blue-50 align-middle justify-center items-center  bg-[#24008CFF] rounded-xl">
            <Text className="font-bold text-lg text-blue-50 text-center">Password Reset</Text>
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.box}>
              {!successfulCreation && !complete && (
                <>
                  <Text className=" text-blue-300 bg-transparent text-2xl font-bold text-center mb-4">
                    Please enter your email
                  </Text>
                  <View className="items-center justify-center align-middle bg-blue-200 rounded-md h-10 w-3/4">
                    <TextInput
                      className="w-full text-center"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      autoComplete="email"
                      placeholder="e.g john@doe.com"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                  {error && <Text style={{ color: "red", marginTop: 2 }}>{error}</Text>}
                  <TouchableOpacity
                    className="border h-10 border-[#00E0FFFF] rounded-md mt-3 mb-6 justify-center align-middle w-3/4 "
                    onPress={create}
                  >
                    <Text className=" text-blue-300 bg-transparent text-xl text-center">Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="border h-10 border-[#00E0FFFF] rounded-md justify-center align-middle w-3/4 mt-12"
                    onPress={() => navigation.goBack()}
                  >
                    <Text className=" text-blue-300 bg-transparent text-xl text-center">Back</Text>
                  </TouchableOpacity>
                </>
              )}
              {successfulCreation && !complete && (
                <>
                  <Text>New password</Text>
                  <View className="items-center justify-center align-middle bg-blue-200 rounded-md h-10">
                    <TextInput
                      className="w-full text-center"
                      autoCapitalize="none"
                      secureTextEntry={true}
                      value={password}
                      onChangeText={setPassword}
                    />
                  </View>
                  <Text>Reset password code</Text>
                  <View className="items-center justify-center align-middle bg-blue-200 rounded-md h-10">
                    <TextInput
                      className="w-full text-center"
                      autoCapitalize="none"
                      value={code}
                      onChangeText={setCode}
                    />
                  </View>
                  <TouchableOpacity onPress={reset}>
                    <Text>Reset</Text>
                  </TouchableOpacity>
                </>
              )}
              {complete && (
                <View className="mt-16 mb-12 h-9 w-60 border border-blue-50 align-middle justify-center items-center  bg-transparent rounded-xl">
                  <Text>You successfully changed your password</Text>
                  <TouchableOpacity
                    className="border h-10 border-[#00E0FFFF] rounded-md justify-center align-middle w-3/4 mt-12"
                    onPress={() => navigation.goBack()}
                  >
                    <Text className=" text-blue-300 bg-transparent text-xl text-center">Back</Text>
                  </TouchableOpacity>
                </View>
              )}
              {secondFactor && <Text>this UI does not handle 2FA</Text>}
            </View>
          </TouchableWithoutFeedback>
        </View>
        {isConnected ? null : (
          <View className="flex-1 align-middle justify-end">
            <OfflineToast />
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
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
    maxHeight: screenHeight / 2.4,
    borderWidth: 1,
    borderColor: "#00E0FFFF",
  },
});
