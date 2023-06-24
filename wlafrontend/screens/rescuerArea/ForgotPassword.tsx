import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  RescuerLogin: undefined;
};
type RescuerLoginNavigationProp = NavigationProp<
  RootStackParamList,
  "RescuerLogin"
>;

type Props = {
  navigation: RescuerLoginNavigationProp;
};

const ForgotPassword = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);

  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  async function create() {
    if (!signIn) {
      // Handle error state, e.g. show an error message
      console.error("signIn is not defined");
      return;
    }
    await signIn
      .create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
      })
      .catch((err) => console.error("error", err.errors[0].longMessage));
  }

  async function reset() {
    if (!signIn || !setActive) {
      // Handle error state, e.g. show an error message
      console.error("signIn or setActive is not defined");
      return;
    }
    await signIn
      .attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
        } else if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          setComplete(true);
        } else {
          console.log(result);
        }
      })
      .catch((err) => console.error("error", err.errors[0].longMessage));
  }

  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Forgot Password",
      headerTintColor: "#000000",
      headerStyle: { backgroundColor: "#71D1C7" },
    });
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text>Forgot Password?</Text>
        {!successfulCreation && !complete && (
          <>
            <Text>Please provide the email you signed up with</Text>
            <View className="items-center justify-center align-middle bg-blue-200 rounded-md h-10">
              <TextInput
                className="w-full text-center"
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                placeholder="e.g john@doe.com"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <TouchableOpacity onPress={create}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </>
        )}
        {successfulCreation && !complete && (
          <>
            <Text>New password</Text>
            <View className="items-center justify-center align-middle bg-blue-200 rounded-md h-10">
              <TextInput
                className="w-full text-center"
                autoCapitalize="none"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <Text>Reset password code</Text>
            <View className="items-center justify-center align-middle bg-blue-200 rounded-md h-10">
              <TextInput
                className="w-full text-center"
                autoCapitalize="none"
                value={code}
                onChangeText={setCode}
              />
            </View>
            <TouchableOpacity onPress={reset}>
              <Text>Reset</Text>
            </TouchableOpacity>
          </>
        )}

        {complete && <Text>You successfully changed your password</Text>}
        {secondFactor && (
          <Text>2FA is required, this UI does not handle that</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
