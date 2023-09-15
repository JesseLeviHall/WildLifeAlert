import React from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { Button } from "native-base";
import AnimatedGradient from "./background/GradientAnimated";
import { useNavigation } from "@react-navigation/native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type Props = {
  error: string;
};

const ErrorMessage = (props: Props) => {
  const navigation = useNavigation();
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
        <View className="flex-1 align-middle justify-center">
          <View className=" -mt-32 h-2/6 mx-4 rounded-lg px-4 items-center  justify-center align-middle bg-[#00D1FF6D]">
            <Text className="text-center text-lg px-4">{props.error}</Text>
          </View>
          
        </View>
      </ImageBackground>
    </View>
  );
};

export default ErrorMessage;

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
});

