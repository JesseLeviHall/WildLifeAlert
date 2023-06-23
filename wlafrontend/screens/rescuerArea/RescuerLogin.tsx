import React from "react";
import { View, Text, Button } from "react-native";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import SignInWithOAuth from "../../components/SignInWithOAuth";
import SignUpComponent from "../../components/SignUpComponent";
import SignInComponent from "../../components/SignInComponent";

type Props = {};

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

const RescuerLogin = (Props: Props) => {
  const { userId, sessionId } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <View className="flex-1 align-middle justify-center">
      <SignedIn>
        <Text className="text-center">
          Hello, {user.firstName} {userId} your current active session is{" "}
          {sessionId}
        </Text>
        <SignOut />
      </SignedIn>
      <SignedOut>
        <SignInWithOAuth />
        <SignUpComponent />
        <SignInComponent />
      </SignedOut>
    </View>
  );
};

export default RescuerLogin;
