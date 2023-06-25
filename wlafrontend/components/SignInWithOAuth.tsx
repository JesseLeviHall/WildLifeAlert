import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, TouchableOpacity, View } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  const [error, setError] = React.useState("");
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    // Reset the error state
    setError("");
    try {
      const { signIn, setActive } = await startOAuthFlow();

      if (signIn) {
        setActive && setActive({ session: signIn.createdSessionId });
      }
    } catch (err: any) {
      console.error("OAuth error", err);
      setError("An error occurred during sign in, please try again.");
    }
  }, []);

  return (
    <View className="w-full">
      <TouchableOpacity
        className="mt-4 border w-full border-[#00E0FFFF] rounded-lg h-16 justify-center align-middle"
        onPress={onPress}
      >
        <Text className=" text-blue-200 text-xl text-center">
          Sign in with Google
        </Text>
      </TouchableOpacity>
      {error && (
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      )}
    </View>
  );
};
export default SignInWithOAuth;
