import * as React from "react";
import { ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Appbar } from "react-native-paper";
import { Dimensions } from "react-native";

import { useNavigation, NavigationProp } from "@react-navigation/native";
import ResourceCard from "../components/ResourceCard";

const screenHeight = Dimensions.get("window").height;

type RootStackParamList = {
  Home: undefined;
};
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;
type Props = {
  navigation: HomeScreenNavigationProp;
};

const Resources = (props: Props) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <LinearGradient
      style={{ height: screenHeight }}
      colors={["#0DE69A", "#71D1C7", "#99BBE3"]}
    >
      <Appbar.Header className="">
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
        <Appbar.Content title="Resources" />
      </Appbar.Header>
      <ScrollView>
        <View className="mx-1 my-3">
          <ResourceCard />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Resources;
