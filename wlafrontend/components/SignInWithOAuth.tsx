import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, TouchableOpacity, Image, View, StyleSheet } from "react-native";
const Glogo = require("../assets/btn_google.png");
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
  const { getToken, signOut } = useAuth();

  const mutation = useMutation(
    (data: { sessionId: string; token: string; expoPushToken: string }) => updatePushToken(data),
    {
      onSuccess: () => {
        return;
      },
      onError: (error) => {
        console.log("Error: ", error);
        setError("An error occurred during sign in, please try again.");
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

        // If the user is trying to sign in but doesn't exist yet
        const userNeedsToBeCreated = signIn?.firstFactorVerification.status === "transferable";
        if (userNeedsToBeCreated) {
          setError("You must create an account to sign in. Please tap sign up below.");
          signOut();
          return;
        }

        let expoPushToken = "";
        let tokenObject = await Notifications.getExpoPushTokenAsync({
          projectId: "17a356f2-ec4c-4d59-920f-b77650d9ba44",
        });
        expoPushToken = tokenObject.data;
        if (sessionId && token) {
          mutation.mutate({ sessionId, token, expoPushToken });
        } else {
          // OAuth flow was cancelled, just return
          return;
        }
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
    }
  }, []);

  return (
    <View className="w-full mt-4">
      <TouchableOpacity
        className=" flex-row border w-full border-[#00E0FFFF] bg-[#4285F4] rounded-lg h-16 justify-center items-center"
        onPress={onPress}
      >
        <Image style={styles.image} source={Glogo} />
        <Text className=" flex-1 text-blue-200 text-xl text-center">Sign in with Google</Text>
      </TouchableOpacity>
      {error && <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>}
    </View>
  );
};
export default SignInWithOAuth;

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    marginLeft: 0,
    marginRight: -16,
  },
});
