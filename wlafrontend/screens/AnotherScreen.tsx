import React from "react";
import { getPrivacyPolicyContent } from "../api/index";
import { Text, View, Linking, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import { useQuery } from "@tanstack/react-query/build/lib";
import { useConnectivity } from "../hooks/useConnectivity";
import { useNavigation } from "@react-navigation/native";
import OfflineToast from "../components/OfflineToast";
import SkeletonComp from "../components/Skeleton";
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

  const { isLoading, data, error } = useQuery(["privacyPolicy"], () => getPrivacyPolicyContent(), {
    enabled: isConnected,
  });

  if (isLoading) {
    return (
      <View className="flex-1 align-middle justify-center">
        <SkeletonComp />
      </View>
    );
  }

  if (error) {
    const err = error as any;
    return (
      <View className="flex-1 align-middle justify-center">
        <Text>{err.message ? err.message : JSON.stringify(error)}</Text>
      </View>
    );
  }

  return (
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
