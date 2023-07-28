import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, ImageBackground, SafeAreaView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Text, Button } from "native-base";
import { Motion } from "@legendapp/motion";

type RootStackParamList = {
  Resources: undefined;
};
type ResourcesProp = NavigationProp<RootStackParamList, "Resources">;
type Props = {
  navigation: ResourcesProp;
};

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const NextSteps = (props: Props) => {
  const navigation = useNavigation<ResourcesProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={{ height: screenHeight, alignItems: "center" }}
        colors={["#0E409C9E", "#71D1C74C", "#EB8705AF"]}
      >
        <ImageBackground source={require("../../assets/desertbg.png")}>
          <Motion.View
            initial={{ x: -100, scale: 1, opacity: 0.1 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            transition={{
              default: {
                type: "spring",
                damping: 30,
                stiffness: 300,
              },
              x: {
                type: "spring",
                damping: 30,
                stiffness: 300,
              },
              opacity: {
                type: "tween",
                duration: 1000,
              },
            }}
            className="flex-1 px-4 items-center"
          >
            <Text className="text-center text-2xl font-extrabold px-4 mt-48">You posted an Alert!</Text>
            <Text className="text-center text-lg font-light px-4 mt-2">
              Good Work. A pin will show up on the map, and nearby registered users who can help will now get an alert.
            </Text>
            <Text className="text-center text-xl font-extrabold px-4 mt-6">Next Steps:</Text>
            <Text className="text-center text-lg font-light px-4 mt-2 mb-14">Utilize the online resources list.</Text>
            <Button className="w-24 absolute bottom-24" onPress={() => navigation.navigate("Resources")}>
              Finish
            </Button>
          </Motion.View>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default NextSteps;
