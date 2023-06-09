import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Appbar, Chip } from "react-native-paper";
import AnimatedGradient from "../components/background/GradientAnimated";
import { Motion } from "@legendapp/motion";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import OfflineToast from "../components/OfflineToast";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getAboutScreenContent } from "../api/index";
import SkeletonComp from "../components/Skeleton";
import { useConnectivity } from "../hooks/useConnectivity";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type RootStackParamList = {
  AnotherScreen: undefined;
  Home: undefined;
};

type HomeScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "AnotherScreen",
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const About = (props: Props) => {
  const [message, setMessage] = React.useState(false);
  const [description, setDescription] = React.useState(false);
  const [mission, setMission] = React.useState(false);
  const [action, setAction] = React.useState(false);

  const navigation = useNavigation<HomeScreenNavigationProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const isConnected = useConnectivity();
  const { isLoading, data, error } = useQuery(
    ["AboutScreen"],
    () => getAboutScreenContent(),
    { enabled: isConnected }
  );

  if (isLoading) {
    return (
      <View className="flex-1 align-middle justify-center">
        <SkeletonComp />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 align-middle justify-center">
        <Text>{JSON.stringify(error)}</Text>;
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
        <Appbar.Content title="About" />
      </Appbar.Header>
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
        <Motion.View
          style={styles.content}
          initial={{ x: -100, scale: 0, opacity: 0.1 }}
          animate={{ x: 0, scale: 1, opacity: 1 }}
          transition={{
            default: {
              type: "spring",
              damping: 20,
              stiffness: 300,
            },
            x: {
              type: "spring",
              damping: 20,
              stiffness: 1000,
            },
            opacity: {
              type: "tween",
              duration: 2000,
            },
          }}
        >
          <View style={styles.chips}>
            <Chip
              mode="outlined"
              className="h-10 w-32 mt-10 bg-transparent border-2 border-blue-50"
              icon="information"
              onPress={() => setMessage(true)}
            >
              Message
            </Chip>
            <Chip
              mode="outlined"
              className="h-10 w-32 mt-10 bg-transparent border-2 border-blue-50"
              icon="information"
              onPress={() => setDescription(true)}
            >
              Description
            </Chip>
            <Chip
              mode="outlined"
              className="h-10 w-32 mt-10 bg-transparent border-2 border-blue-50"
              icon="information"
              onPress={() => setMission(true)}
            >
              Mission
            </Chip>
            <Chip
              mode="outlined"
              className="h-10 w-32 mt-10 bg-transparent border-2 border-blue-50"
              icon="information"
              onPress={() => setAction(true)}
            >
              Action
            </Chip>
          </View>
          {message ? <Text style={styles.text}>{data?.Message}</Text> : null}
          {description ? (
            <Text style={styles.text}>{data?.Description}</Text>
          ) : null}
          {mission ? <Text style={styles.text}>{data?.Mission}</Text> : null}
          {action ? <Text style={styles.text}>{data?.Action}</Text> : null}
          <TouchableOpacity
            onPress={() => navigation.navigate("AnotherScreen")}
          >
            <Text className="text-blue-500 font-semibold">
              Terms of Service
            </Text>
          </TouchableOpacity>
          {isConnected ? null : (
            <View className="flex-1 align-middle justify-end">
              <OfflineToast />
            </View>
          )}
        </Motion.View>
      </ImageBackground>
    </View>
  );
};

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
    justifyContent: "flex-start",
    zIndex: 10,
  },
  text: {
    fontSize: 30,
    color: "#000",
    textAlign: "center",
  },
  chips: {},
});

export default About;
