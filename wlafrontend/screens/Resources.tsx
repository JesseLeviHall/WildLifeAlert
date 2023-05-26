import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Appbar } from "react-native-paper";
import { Dimensions } from "react-native";
import { Link, Text, VStack, Image } from "native-base";
import { useNavigation, NavigationProp } from "@react-navigation/native";

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
      <VStack space={2} justifyContent="center" alignItems="center" safeAreaTop>
        <Image
          width={40}
          height={20}
          resizeMode="cover"
          source={{
            uri: "https://ahnow.org/images/weblink_small.png",
          }}
          alt="animal help now.org"
        />
        <Link href="https://ahnow.org" isExternal>
          <Text>Visit </Text>
          <Text className=" text-blue-500">AnimalHelpNow.org </Text>
        </Link>
        <Text className="mx-16">
          to locate wildlife rescue organizations near you
        </Text>
      </VStack>
    </LinearGradient>
  );
};

export default Resources;
