import * as React from "react";
import {
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

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
    } catch (err: any) {
      setError(err.errors[0].message);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 align-middle justify-center bg-transparent w-full  h-auto rounded-lg ">
        {!pendingVerification && (
          <View className="w-full">
            <Text className="text-blue-300 text-light text-sm text-center mb-3">
              or
            </Text>
            <View className="items-center mb-1 justify-center align-middle bg-blue-200 rounded-md h-10">
              <TextInput
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
                className="w-full text-center"
                autoCapitalize="none"
                autoComplete="password"
                value={password}
                placeholder="Password..."
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            {error && (
              <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
            )}
            <TouchableOpacity
              className="border h-10 border-[#00E0FFFF] rounded-md mt-2 justify-center align-middle "
              onPress={onSignUpPress}
            >
              <Text className=" text-blue-200 bg-transparent text-xl text-center">
                Continue with Email
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {pendingVerification && (
          <View className="w-full">
            <View className="items-center mb-1 justify-center align-middle bg-blue-200 rounded-md h-10">
              <TextInput
                className="w-full text-center"
                autoCapitalize="none"
                value={code}
                placeholder="Code..."
                onChangeText={(code) => setCode(code)}
              />
            </View>
            <TouchableOpacity onPress={onPressVerify}>
              <Text className=" text-blue-200 bg-transparent text-xl text-center">
                Verify Email
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
