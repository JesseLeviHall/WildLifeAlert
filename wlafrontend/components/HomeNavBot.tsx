import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { TouchableRipple, Surface } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Box, HStack } from "native-base";

type RootStackParamList = {
  Home: undefined;
  PublicMap: undefined;
  SendForHelp: undefined;
  About: undefined;
  RescuerLogin: undefined;
  Resources: undefined;
};
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;
type Props = {
  navigation: HomeScreenNavigationProp;
};

const screenWidth = Dimensions.get("window").width;

const HomeNavBot = (props: Props) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <Surface elevation={4} style={styles.container}>
      <HStack
        space={3}
        borderWidth="1"
        borderColor="coolGray.300"
        justifyContent="center"
        bg="#33fff2"
      >
        <TouchableRipple
          borderless={true}
          underlayColor="#99BBE3"
          onPress={() => navigation.navigate("RescuerLogin")}
        >
          <Box
            p="2"
            alignItems="center"
            _text={{
              fontSize: "sm",
              fontWeight: "medium",
              letterSpacing: "lg",
            }}
          >
            <MaterialCommunityIcons name="launch" size={24} />
            {"Rescuers"}
          </Box>
        </TouchableRipple>

        <TouchableRipple
          borderless={true}
          rippleColor="#99BBE3"
          onPress={() => navigation.navigate("PublicMap")}
        >
          <Box
            p="2"
            alignItems="center"
            _text={{
              fontSize: "sm",
              fontWeight: "medium",
              letterSpacing: "lg",
            }}
          >
            <MaterialCommunityIcons name="earth" size={24} />
            {"Live Map"}
          </Box>
        </TouchableRipple>

        <TouchableRipple
          borderless={true}
          rippleColor="#99BBE3"
          onPress={() => navigation.navigate("Resources")}
        >
          <Box
            p="2"
            alignItems="center"
            _text={{
              fontSize: "sm",
              fontWeight: "medium",
              letterSpacing: "lg",
            }}
          >
            <MaterialCommunityIcons name="magnify-expand" size={24} />
            {"Resources"}{" "}
          </Box>
        </TouchableRipple>

        <TouchableRipple
          borderless={true}
          rippleColor="#99BBE3"
          onPress={() => navigation.navigate("About")}
        >
          <Box
            p="2"
            alignItems="center"
            _text={{
              fontSize: "sm",
              fontWeight: "medium",
              letterSpacing: "lg",
            }}
          >
            <MaterialCommunityIcons name="lightbulb-on" size={24} />
            {"About"}{" "}
          </Box>
        </TouchableRipple>
      </HStack>
    </Surface>
  );
};

export default HomeNavBot;

//create styleshee:
const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    position: "absolute",
    bottom: 0,
    marginTop: 10,
  },
});
