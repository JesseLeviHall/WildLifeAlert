import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";

//TODO: Forgot password functionality

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      setError(err.errors[0].message);
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <View className="flex-1 align-middle justify-center bg-transparent w-full h-auto m-4 px-8 rounded-lg ">
      <View className="items-center mb-2 justify-center align-middle bg-blue-200 rounded-md h-10">
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>
      <View className="items-center justify-center align-middle bg-blue-200 rounded-md h-10">
        <TextInput
          autoCapitalize="none"
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <TouchableOpacity
        className="border h-10 border-[#00E0FFFF] rounded-md mt-2 justify-center align-middle "
        onPress={onSignInPress}
      >
        <Text className=" text-blue-300 bg-transparent text-xl text-center">
          Sign in with Email
        </Text>
      </TouchableOpacity>
    </View>
  );
}
