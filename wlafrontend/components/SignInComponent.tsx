import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";

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
    <View className="flex-1 align-middle justify-center bg-slate-200">
      <View className="items-center bg-neutral-400 ">
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View className="items-center bg-blue-200">
        <TextInput
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <TouchableOpacity onPress={onSignInPress}>
        <Text className="bg-red-400 text-2xl">Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}
