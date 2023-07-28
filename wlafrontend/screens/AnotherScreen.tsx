import React from "react";
import { getPrivacyPolicyContent } from "../api/index";
import { Text, View, Linking, StyleSheet, Dimensions, SafeAreaView, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import { useQuery } from "@tanstack/react-query/build/lib";
import { useConnectivity } from "../hooks/useConnectivity";
import { useNavigation } from "@react-navigation/native";
import OfflineToast from "../components/OfflineToast";
import SpinnerComp from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import AnimatedGradient from "../components/background/GradientAnimated";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type Props = {};

const AnotherScreen = (props: Props) => {
  const isConnected = useConnectivity();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Policies & Terms",
      headerTintColor: "#000000",
      headerStyle: { backgroundColor: "#71D1C7" },
    });
  });

  const { isLoading, data, error } = useQuery(
    ["privacyPolicy"],
    async () => {
      try {
        return await getPrivacyPolicyContent();
      } catch (error) {
        console.error("Error fetching privacy policy content:", error);
        return null;
      }
    },
    {
      enabled: isConnected,
    }
  );

  if (isLoading) {
    return (
      <View className="flex-1 align-middle justify-center">
        <SpinnerComp />
      </View>
    );
  }

  if (data?.error) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error={data?.error.message} />
      </View>
    );
  }

  if (data === null) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error="Sorry! Error fetching the data" />
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error="Sorry, error fetching data" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/desertbg.png")}
          style={{
            height: screenHeight,
            width: screenWidth,
            margin: 0,
            padding: 0,
          }}
        >
          <View style={styles.background}>
            <AnimatedGradient />
          </View>
          <View style={styles.content}>
            <Button
              onPress={() => Linking.openURL(`${data?.Link}`)}
              mode="elevated"
              buttonColor="#00E0FFFF"
              className=" my-4 w-40"
            >
              {data.Title}
            </Button>
            <Button
              onPress={() => Linking.openURL(`${data?.Link2}`)}
              mode="elevated"
              buttonColor="#00E0FFFF"
              className="my-2 w-40 "
            >
              {data.Title2}
            </Button>
          </View>
          {isConnected ? null : (
            <View className="flex-1 align-middle justify-end">
              <OfflineToast />
            </View>
          )}
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default AnotherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    zIndex: -10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: screenHeight / 1.5,
    zIndex: 10,
  },
  text: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    zIndex: 10,
    padding: 20,
  },
});
