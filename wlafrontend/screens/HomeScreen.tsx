import React, { useLayoutEffect } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import { Motion } from "@legendapp/motion";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getHomeScreenContent } from "../api/index";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useConnectivity } from "../hooks/useConnectivity";
import SpinnerComp from "../components/Spinner";
import OfflineToast from "../components/OfflineToast";
import HomeNavBot from "../components/HomeNavBot";
import HomeBackG from "../components/background/HomeBackG";

type RootStackParamList = {
  Home: undefined;
  SendForHelp: undefined;
  PublicMap: undefined;
  About: undefined;
  RescuerLogin: undefined;
  Resources: undefined;
};
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;
type Props = {
  navigation: HomeScreenNavigationProp;
};

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Home = (props: Props) => {
  const isConnected = useConnectivity();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const { isLoading, data, error } = useQuery(["HomeScreen"], () => getHomeScreenContent(), { enabled: isConnected });

  if (isLoading) {
    return (
      <View className="flex-1 align-middle justify-center">
        <SpinnerComp />
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
    <View style={styles.outer}>
      <Image
        style={{
          height: screenHeight,
          width: screenWidth,
          backgroundColor: "transparent",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        source={require("../assets/sunbg.png")}
      />
      <View style={styles.background}>
        <HomeBackG />
      </View>
      <Motion.View
        initial={{ x: -300, scale: 0, opacity: 0 }}
        animate={{ x: 0, scale: 1, opacity: 1 }}
        transition={{
          x: {
            type: "spring",
            damping: 20,
            stiffness: 800,
            mass: 2,
          },
          opacity: {
            type: "tween",
            duration: 1000,
          },
        }}
      >
        <View className="mt-12 h-96 flex flex-col items-center">
          <View className=" mt-9 max-h-9  flex-1 py-1 px-4 align-middle justify-center  bg-[#77CFCA] rounded-xl">
            <Text className="font-bold text-lg text-[#24374b]">{data?.Message}</Text>
          </View>
          <Text className="font-black mt-5 mix-blend-color  uppercase text-[#24374b] text-3xl">{data?.Title}</Text>
          <Text className=" text-2xl text-center px-4 text-[#24374b] font-light">{data?.Description}</Text>
        </View>
      </Motion.View>
      {isConnected ? null : (
        <View className="flex-1 align-middle justify-end">
          <OfflineToast />
        </View>
      )}
      <View style={styles.holdingButton}>
        <View style={styles.yellowcircle}>
          <TouchableOpacity
            style={{ zIndex: 1 }}
            onPress={() => {
              navigation.navigate("SendForHelp");
            }}
          >
            <View style={styles.container}>
              <Text style={styles.button}>Start Alert</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.nav}>
        <HomeNavBot navigation={navigation} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#15ff00",
    margin: 6,
    padding: 0,
    height: 145,
    width: 145,
    borderRadius: 108,
    shadowOffset: { width: 5, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowColor: "#000",
    innerShadow: 6,
  },
  nav: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    width: screenWidth,
    height: screenHeight,
  },
  background: {
    position: "absolute",
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    zIndex: -10,
  },
  outer: {
    flex: 1,
    zIndex: 1,
  },
  yellowcircle: {
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#04b6d1",
    margin: 6,
    padding: 0,
    height: 180,
    width: 180,
    borderRadius: 108,
    borderWidth: 2,
    borderColor: "#15ff00fe",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowColor: "#000",
  },
  holdingButton: {
    zIndex: 1,
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: [{ translateX: -90 }],
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    zIndex: 1,
    fontSize: 24,
    color: "#2a527a",
    fontWeight: "bold",
  },
});
