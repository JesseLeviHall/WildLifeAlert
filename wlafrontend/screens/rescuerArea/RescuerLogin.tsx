import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import SignInWithOAuth from "../../components/SignInWithOAuth";
import SignInComponent from "../../components/SignInComponent";
import SkeletonComp from "../../components/Skeleton";

type RootStackParamList = {
  RescuerRegister: undefined;
};
type RescuerRegisterNavigationProp = NavigationProp<
  RootStackParamList,
  "RescuerRegister"
>;
type Props = {
  navigation: RescuerRegisterNavigationProp;
};

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return <SkeletonComp />;
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
  const navigation = useNavigation<RescuerRegisterNavigationProp>();
  const isConnected = useConnectivity();
  const { userId, sessionId } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return null;
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Rescuer Portal",
      headerTintColor: "#000000",
      headerStyle: { backgroundColor: "#71D1C7" },
    });
  });

  return (
    <View className="flex-1 align-middle justify-center">
      <SignedIn>
        <Text className="text-center">
          Hello, {user?.firstName} {userId} your current active session is{" "}
          {sessionId}
        </Text>
        <SignOut />
      </SignedIn>
      <SignedOut>
        <SignInWithOAuth />
        <SignInComponent />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RescuerRegister");
          }}
        >
          <Text>Sign up as a rescuer</Text>
        </TouchableOpacity>
      </SignedOut>
      {isConnected ? null : (
        <View className="flex-1 align-middle justify-end">
          <OfflineToast />
        </View>
      )}
    </View>
  );
};

export default RescuerLogin;
