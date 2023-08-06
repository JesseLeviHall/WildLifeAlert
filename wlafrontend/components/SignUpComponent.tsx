import * as React from "react";
import { Text, Keyboard, TouchableWithoutFeedback, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp, useAuth } from "@clerk/clerk-expo";
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

export default function SignUpScreen({ userDetails, navigation }: Props) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");

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
    },
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setError("");
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.errors[0].message);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      await setActive({ session: completeSignUp.createdSessionId });
      finishSignUp(completeSignUp.createdUserId);
    } catch (err: any) {
      setError(err.errors[0].message);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const finishSignUp = async (userId: string | null) => {
    if (setActive) {
      try {
        if (userId && userDetails) {
          userDetails.userId = userId;
          mutation.mutate({ userDetails });
        } else {
          throw new Error("User ID or user details is undefined");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 align-middle justify-center bg-transparent w-full  h-auto rounded-lg ">
        {!pendingVerification && (
          <View className="w-full">
            <Text className="text-blue-300 text-light text-sm text-center mb-6">or</Text>
            <View className="items-center mb-1 justify-center align-middle bg-blue-200 rounded-md h-10">
              <TextInput
                maxLength={100}
                className="w-full text-center"
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                value={emailAddress}
                placeholder="Email..."
                onChangeText={(email) => setEmailAddress(email)}
              />
            </View>
            <View className="items-center mb-1 justify-center align-middle bg-blue-200 rounded-md h-10">
              <TextInput
                maxLength={100}
                className="w-full text-center"
                autoCapitalize="none"
                autoComplete="password"
                value={password}
                placeholder="Create Password..."
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <TouchableOpacity
              className="border h-10 border-[#00E0FFFF] rounded-md mt-2 justify-center align-middle "
              onPress={onSignUpPress}
            >
              <Text className=" text-blue-200 bg-transparent text-xl text-center">Continue with Email</Text>
            </TouchableOpacity>
            {error && <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>}
          </View>
        )}
        {pendingVerification && (
          <View className="w-full">
            <Text className="text-center font-light text-sm mb-2">Please check your email for a verification code</Text>
            <View className="items-center mb-1 justify-center align-middle bg-blue-200 rounded-md h-10">
              <TextInput
                className="w-full text-center"
                autoCapitalize="none"
                value={code}
                placeholder="Code..."
                onChangeText={(code) => setCode(code)}
              />
            </View>
            <TouchableOpacity
              className="border rounded-md w-full border-[#00E0FFFF] mt-4 p-3 mb-4"
              onPress={onPressVerify}
            >
              <Text className=" text-blue-200 bg-transparent text-xl text-center">Verify Code</Text>
            </TouchableOpacity>
            {error && <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

/* 
 try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      await setActive({ session: completeSignUp.createdSessionId });
      const sessionId = completeSignUp.createdSessionId;
      const token = await getToken();
      if (sessionId && token && userDetails) {
        mutation.mutate({ sessionId, token, userDetails });
      } else {
        throw new Error("Session ID, token, or user details is undefined");
      }
    } catch (err: any) {
      setError(err.errors[0].message);
      console.error(JSON.stringify(err, null, 2));
    }

*/
