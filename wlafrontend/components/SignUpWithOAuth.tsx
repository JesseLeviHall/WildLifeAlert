import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, TouchableOpacity, View } from "react-native";
import { useOAuth, useAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useMutation } from "@tanstack/react-query/build/lib";
import { registerRescuer } from "../api/index";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const { getToken } = useAuth();

  const mutation = useMutation(
    (data: {
      sessionId: string | null;
      token: string | null;
      userDetails: Record<string, string>;
    }) => registerRescuer(data),
    {
      onSuccess: async () => {
        await AsyncStorage.multiRemove([
          "FullName",
          "Phone",
          "location",
          "Rehab",
          "Medical",
          "Professional",
          "Organization",
        ]);
        navigation.navigate("RescuerWelcome");
      },
      onError: (error) => {
        console.log("Error: ", error);
        setError("An error occurred during sign up, please try again.");
      },
    }
  );

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    setError("");
    try {
      const { signUp, setActive } = await startOAuthFlow();

      if (signUp) {
        setActive && setActive({ session: signUp.createdSessionId });
        const sessionId = signUp.createdSessionId;
        const token = await getToken();
        if (sessionId && token && userDetails) {
          mutation.mutate({ sessionId, token, userDetails });
        } else {
          throw new Error("Session ID, token, or user details is undefined");
        }
      }
    } catch (err: any) {
      console.error("OAuth error", err);
      setError(err.errors[0].message);
      console.error(JSON.stringify(err, null, 2));
    }
  }, [userDetails]);

  return (
    <View className="w-full">
      <TouchableOpacity
        className="mt-4 border w-full border-[#00E0FFFF] rounded-lg h-16 justify-center align-middle"
        onPress={onPress}
      >
        <Text className=" text-blue-200 text-xl text-center">
          Continue with Google
        </Text>
      </TouchableOpacity>
      {error && (
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      )}
    </View>
  );
};
export default SignUpWithOAuth;
