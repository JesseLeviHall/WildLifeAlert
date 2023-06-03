import React from "react";
import { Spinner, View } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

type Props = {};

const SpinnerComp = (props: Props) => {
  const screenHeight = Dimensions.get("window").height;
  return (
    <LinearGradient
      style={{ height: screenHeight }}
      colors={["#0DE69A", "#71D1C7", "#99BBE3"]}
    >
      <View className="flex-1 align-middle justify-center">
        <Spinner accessibilityLabel="Loading" size="lg" />
      </View>
    </LinearGradient>
  );
};

export default SpinnerComp;
