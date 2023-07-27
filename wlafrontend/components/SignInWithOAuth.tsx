import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, TouchableOpacity, View } from "react-native";
import { useOAuth, useAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import * as Notifications from "expo-notifications";
import { useMutation } from "@tanstack/react-query/build/lib";
import { useConnectivity } from "../hooks/useConnectivity";
import { updatePushToken } from "../api/index";

type Props = {};

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = (props: Props) => {
  const [error, setError] = React.useState("");
  useWarmUpBrowser();
  const isConnected = useConnectivity();
  const { getToken } = useAuth();

  const mutation = useMutation(
    (data: { sessionId: string; token: string; expoPushToken: string }) => updatePushToken(data),
    {
      onSuccess: () => {
        return;
      },
      onError: (error) => {
        console.log("Error: ", error);
        setError("An error occurred during sign up, please try again.");
      },
    }
  );

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    setError("");
    if (!isConnected) {
      setError("No internet connection");
      return;
    }
    try {
      const { signIn, setActive } = await startOAuthFlow();
      if (signIn) {
        setActive && setActive({ session: signIn.createdSessionId });
        const sessionId = signIn.createdSessionId;
        const token = await getToken();

        let expoPushToken = "";
        let tokenObject = await Notifications.getExpoPushTokenAsync({
          projectId: "17a356f2-ec4c-4d59-920f-b77650d9ba44",
        });
        expoPushToken = tokenObject.data;
        if (sessionId && token) {
          mutation.mutate({ sessionId, token, expoPushToken });
        } else {
          console.error("SessionId or Token is missing!");
          setError("An error occurred during sign in, please try again.");
        }
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
        <Text className=" text-blue-200 text-xl text-center">Sign in with Google</Text>
      </TouchableOpacity>
      {error && <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>}
    </View>
  );
};
export default SignInWithOAuth;
