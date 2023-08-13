import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, TouchableOpacity, Image, View, StyleSheet } from "react-native";
const Glogo = require("../assets/btn_google.png");
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useMutation } from "@tanstack/react-query/build/lib";
import { registerRescuer } from "../api/index";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Spinner } from "native-base";

type RootStackParamList = {
  RescuerWelcome: undefined;
};
type RescuerWelcomeProp = NavigationProp<RootStackParamList, "RescuerWelcome">;

type Props = {
  navigation: RescuerWelcomeProp;
  userDetails: Record<string, string>;
};

WebBrowser.maybeCompleteAuthSession();

const SignUpWithOAuth = ({ userDetails, navigation }: Props) => {
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const mutation = useMutation((data: { userDetails: Record<string, string> }) => registerRescuer(data), {
    onSuccess: async () => {
      await AsyncStorage.multiRemove([
        "FullName",
        "Phone",
        "location",
        "Rehab",
        "Medical",
        "Professional",
        "Organization",
        "expoPushToken",
      ]);
      navigation.navigate("RescuerWelcome");
    },
    onError: (error) => {
      console.log("Error: ", error);
      setError("An error occurred during sign up, please try again.");
    },
  });

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const { signUp, setActive } = await startOAuthFlow();

      if (signUp && signUp.createdSessionId) {
        setActive && setActive({ session: signUp.createdSessionId });
        const userId = signUp.createdUserId;

        if (!userId || !userDetails) {
          throw new Error("userId or user details is undefined");
        }
        userDetails.userId = userId;
        mutation.mutate({ userDetails });
      } else {
        // OAuth flow was cancelled, just return
        return;
      }
    } catch (err: any) {
      console.error("OAuth error", err);
      console.error("Error message: ", err.message);
      if (err.message === "OAuth flow was cancelled") {
        setError("");
      } else {
        setError(err.errors[0].message);
        console.error(JSON.stringify(err, null, 2));
      }
    } finally {
      setIsLoading(false);
      setError("");
    }
  }, [userDetails, mutation, setIsLoading]);

  return (
    <View className="w-full mt-4">
      <TouchableOpacity
        className=" flex-row border w-full border-[#00E0FFFF] bg-[#4285F4] rounded-lg h-16 justify-center items-center"
        onPress={onPress}
      >
        <Image style={styles.image} source={Glogo} />
        <Text className=" flex-1 text-blue-200 text-xl text-center">Sign up with Google</Text>
      </TouchableOpacity>
      {error && <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>}
    </View>
  );
};
export default SignUpWithOAuth;

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    marginLeft: 0,
    marginRight: -16,
  },
});
