import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignUpComponent from "../../components/SignUpComponent";

type Props = {};

const RescuerLogin = (Props: Props) => {
  return (
    <View className="flex-1 align-middle justify-center">
      <SignedIn>
        <Text className="text-center">You are Signed in</Text>
      </SignedIn>
      <SignedOut>
        <SignUpComponent />
      </SignedOut>
    </View>
  );
};

export default RescuerLogin;
