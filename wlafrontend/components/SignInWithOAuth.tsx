import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { signIn, setActive } = await startOAuthFlow();

      if (signIn) {
        setActive && setActive({ session: signIn.createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity
      className="mt-4 border w-full border-[#00E0FFFF] rounded-lg p-4"
      onPress={onPress}
    >
      <Text className=" text-blue-300 text-xl text-center">
        Sign in with Google
      </Text>
      <Text className="text-blue-50 text-light text-center">
        If you registered with google
      </Text>
    </TouchableOpacity>
  );
};
export default SignInWithOAuth;
