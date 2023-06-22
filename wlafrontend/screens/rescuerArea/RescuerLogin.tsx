import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignInWithOAuth from "../../components/SignInWithOAuth";
import SignUpComponent from "../../components/SignUpComponent";
import SignInComponent from "../../components/SignInComponent";

type Props = {};

const RescuerLogin = (Props: Props) => {
  return (
    <View className="flex-1 align-middle justify-center">
      <SignedIn>
        <Text className="text-center">You are Signed in</Text>
      </SignedIn>
      <SignedOut>
        <SignInWithOAuth />
      </SignedOut>
    </View>
  );
};

export default RescuerLogin;
