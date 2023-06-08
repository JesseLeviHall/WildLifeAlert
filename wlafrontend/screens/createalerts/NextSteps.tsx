import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { View, Text, Button } from "native-base";

type RootStackParamList = {
  Resources: undefined;
};
type ResourcesProp = NavigationProp<RootStackParamList, "Resources">;
type Props = {
  navigation: ResourcesProp;
};
const screenHeight = Dimensions.get("window").height;
const NextSteps = (props: Props) => {
  const navigation = useNavigation<ResourcesProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <LinearGradient
      style={{ height: screenHeight }}
      colors={["#6495ED70", "#71D1C74C", "#C6ED028C"]}
    >
      <View className="flex-1 align-middle justify-center">
        <Text>
          Thank you for posting an Alert. Here is what happens now, and what to
          expect.{" "}
        </Text>
        <Button onPress={() => navigation.navigate("Resources")}>Finish</Button>
      </View>
    </LinearGradient>
  );
};

export default NextSteps;
