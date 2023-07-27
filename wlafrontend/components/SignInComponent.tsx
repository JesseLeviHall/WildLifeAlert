import React from "react";
import { Text, Keyboard, TouchableWithoutFeedback, TextInput, TouchableOpacity, View } from "react-native";
import { useSignIn, useAuth } from "@clerk/clerk-expo";
import * as Notifications from "expo-notifications";
import { useMutation } from "@tanstack/react-query/build/lib";
import { useConnectivity } from "../hooks/useConnectivity";
import { updatePushToken } from "../api/index";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
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

  const onSignInPress = async () => {
    setError("");
    if (!isLoaded) {
      return;
    }

    if (!isConnected) {
      setError("No internet connection");
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
      const sessionId = completeSignIn.createdSessionId;
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
    } catch (err: any) {
      setError(err.errors[0].message);
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 align-middle justify-center bg-transparent w-full h-auto px-8 rounded-lg ">
        <Text className="text-blue-300 text-light text-sm text-center mb-3">or</Text>
        <View className="items-center mb-1 justify-center align-middle bg-blue-200 rounded-md h-10">
          <TextInput
            maxLength={100}
            className="w-full text-center"
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
        </View>
        <View className="items-center justify-center align-middle bg-blue-200 rounded-md h-10">
          <TextInput
            maxLength={100}
            className="w-full text-center"
            autoCapitalize="none"
            autoComplete="password"
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        {error && <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>}
        <TouchableOpacity
          className="border h-10 border-[#00E0FFFF] rounded-md mt-2 justify-center align-middle "
          onPress={onSignInPress}
        >
          <Text className=" text-blue-200 bg-transparent text-xl text-center">Sign in with Email</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
