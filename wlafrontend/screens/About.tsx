import * as React from "react";
import {
  View,
  Text,
  Linking,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Appbar, Chip, Button } from "react-native-paper";
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
  const [message, setMessage] = React.useState(true);
  const [description, setDescription] = React.useState(false);
  const [mission, setMission] = React.useState(false);
  const [action, setAction] = React.useState(false);
  const [animationKey, setAnimationKey] = React.useState(0);

  //function to handle press on chip and set state to true for the corresponding text, set all others to false
  const handlePress = (chip: string) => {
    switch (chip) {
      case "message":
        setMessage(true);
        setDescription(false);
        setMission(false);
        setAction(false);
        setAnimationKey(animationKey + 1);
        break;
      case "description":
        setMessage(false);
        setDescription(true);
        setMission(false);
        setAction(false);
        setAnimationKey(animationKey + 1);
        break;
      case "mission":
        setMessage(false);
        setDescription(false);
        setMission(true);
        setAction(false);
        setAnimationKey(animationKey + 1);
        break;
      case "action":
        setMessage(false);
        setDescription(false);
        setMission(false);
        setAction(true);
        setAnimationKey(animationKey + 1);
        break;
      default:
        setMessage(false);
        setDescription(false);
        setMission(false);
        setAction(false);
        setAnimationKey(animationKey + 1);
        break;
    }
  };

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
        <View style={styles.content}>
          <View style={styles.chips}>
            <Chip
              elevated={true}
              mode="flat"
              selected={message}
              selectedColor="#000626FF"
              showSelectedOverlay={true}
              className="h-10 w-32 mt-5 border-2 border-blue-50"
              icon="message-image"
              onPress={() => handlePress("message")}
            >
              Ethos
            </Chip>
            <Chip
              elevated={true}
              mode="flat"
              selected={description}
              selectedColor="#000626FF"
              showSelectedOverlay={true}
              className="h-10 w-32 mt-5 border-2 border-blue-50"
              icon="script-text"
              onPress={() => handlePress("description")}
            >
              Description
            </Chip>
            <Chip
              elevated={true}
              mode="flat"
              selected={mission}
              selectedColor="#000626FF"
              showSelectedOverlay={true}
              className="h-10 w-32 mt-2 border-2 border-blue-50"
              icon="creation"
              onPress={() => handlePress("mission")}
            >
              Mission
            </Chip>
            <Chip
              elevated={true}
              mode="flat"
              selected={action}
              showSelectedOverlay={true}
              selectedColor="#000626FF"
              className="h-10 w-32 mt-2 border-2 border-blue-50"
              icon="arm-flex"
              onPress={() => handlePress("action")}
            >
              Help Out
            </Chip>
          </View>
          <Motion.View
            key={animationKey}
            initial={{ x: -100, scale: 1, opacity: 0.1 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            transition={{
              default: {
                type: "spring",
                damping: 30,
                stiffness: 600,
              },
              x: {
                type: "spring",
                damping: 30,
                stiffness: 600,
              },
              opacity: {
                type: "tween",
                duration: 900,
              },
            }}
            style={styles.textContainer}
          >
            {message && <Text style={styles.text}>{data?.Message}</Text>}
            {description && (
              <Text style={styles.text}>{data?.Description}</Text>
            )}
            {mission && <Text style={styles.text}>{data?.Mission}</Text>}
            {action && (
              <View className="items-center">
                <Text style={styles.text}>{data?.Action}</Text>
                <Button
                  className="my-10 w-40"
                  mode="contained-tonal"
                  onPress={() => Linking.openURL(`${data?.Link}`)}
                >
                  Contribute
                </Button>
              </View>
            )}
          </Motion.View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AnotherScreen")}
          >
            <Text className="text-blue-900 mt-20 font-semibold text-center">
              Privacy Policy & Terms
            </Text>
          </TouchableOpacity>
          {isConnected ? null : (
            <View className="flex-1 align-middle justify-end">
              <OfflineToast />
            </View>
          )}
        </View>
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
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    zIndex: 10,
    padding: 20,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: screenWidth / 1.5,
    alignSelf: "center",
    marginTop: 50,
    zIndex: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "rgba(0, 224, 255, 0.3)",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight / 2.5,
    //add a border
    borderWidth: 1,
    borderColor: "#00E0FFFF",
  },
});

export default About;
