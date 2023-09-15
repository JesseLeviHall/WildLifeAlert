import * as React from "react";
import {
  View,
  Text,
  Linking,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Share,
  Platform,
} from "react-native";
import { Appbar, Chip, Button } from "react-native-paper";
import AnimatedGradient from "../components/background/GradientAnimated";
import { Motion } from "@legendapp/motion";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import OfflineToast from "../components/OfflineToast";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getAboutScreenContent } from "../api/index";
import SpinnerComp from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import ConditionalSafeAreaView from "../components/ConditionalSafeArea";
import { useConnectivity } from "../hooks/useConnectivity";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type RootStackParamList = {
  AnotherScreen: undefined;
  Home: undefined;
};

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "AnotherScreen", "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const About = (props: Props) => {
  const [message, setMessage] = React.useState(true);
  const [description, setDescription] = React.useState(false);
  const [mission, setMission] = React.useState(false);
  const [action, setAction] = React.useState(false);
  const [animationKey, setAnimationKey] = React.useState(0);
  const isIOS = Platform.OS === "ios";

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

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Download WildLifeAlert from this link: https://wildlifealert.page.link/76UZ",
      });
    } catch (error: any) {
      alert(error.message);
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
    ["aboutscreen", "aboutscreen"],
    async () => {
      try {
        return await getAboutScreenContent();
      } catch (error) {
        console.error("Error fetching about screen content:", error);
        return null;
      }
    },
    {
      enabled: isConnected,
    }
  );

  if (isLoading) {
    return (
      <View className="flex-1 align-middle justify-center">
        <SpinnerComp />
      </View>
    );
  }

  if (data?.error) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error={data?.error.message} />
      </View>
    );
  }

  if (data === null) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error="Sorry! Error fetching data. Swipe right to return." />
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error="Sorry, error fetching data" />
      </View>
    );
  }

  return (
    <ConditionalSafeAreaView>
      <View style={styles.container}>
        <Appbar.Header style={{ backgroundColor: "#87BEFFFF" }}>
          <Appbar.BackAction
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
          <Appbar.Content title="WildLifeAlert" />
        </Appbar.Header>
        <ImageBackground
          source={require("../assets/desertbg.png")}
          style={{
            height: screenHeight,
            width: screenWidth,
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
                selectedColor="#B3B6FFD6"
                textStyle={{ color: "white" }}
                showSelectedOverlay={true}
                className={`h-10 w-32 mt-5 ${isIOS ? "bg-[rgba(255,255,255,0)]" : ""} border-2 border-cyan-500`}
                icon={() => <MaterialCommunityIcons name="chat-alert" size={18} color="#54ACFFFF" />}
                onPress={() => handlePress("message")}
              >
                Problem
              </Chip>
              <Chip
                elevated={true}
                mode="flat"
                selected={description}
                selectedColor="#B3B6FFD6"
                textStyle={{ color: "white" }}
                showSelectedOverlay={true}
                className={`h-10 w-32 mt-5 ${isIOS ? "bg-[rgba(255,255,255,0)]" : ""} border-2 border-cyan-500`}
                icon={() => <MaterialCommunityIcons name="charity" size={18} color="#54ACFFFF" />}
                onPress={() => handlePress("description")}
              >
                Solution
              </Chip>
              <Chip
                elevated={true}
                mode="flat"
                selected={mission}
                selectedColor="#B3B6FFD6"
                textStyle={{ color: "white" }}
                showSelectedOverlay={true}
                className={`h-10 w-32 mt-5 ${isIOS ? "bg-[rgba(255,255,255,0)]" : ""} border-2 border-cyan-500`}
                icon={() => <MaterialCommunityIcons name="creation" size={18} color="#54ACFFFF" />}
                onPress={() => handlePress("mission")}
              >
                Mission
              </Chip>
              <Chip
                elevated={true}
                mode="flat"
                selected={action}
                showSelectedOverlay={true}
                selectedColor="#B3B6FFD6"
                textStyle={{ color: "white" }}
                className={`h-10 w-32 mt-5 ${isIOS ? "bg-[rgba(255,255,255,0)]" : ""} border-2 border-cyan-500`}
                icon={() => <MaterialCommunityIcons name="arm-flex" size={18} color="#54ACFFFF" />}
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
              {description && <Text style={styles.text}>{data?.Description}</Text>}
              {mission && <Text style={styles.text}>{data?.Mission}</Text>}
              {action && (
                <View className="items-center -mt-8">
                  <View className="flex flex-col justify-center items-center">
                    <View className="flex flex-row justify-center">
                      <Button
                        className="w-32 border-2 border-cyan-500 m-2"
                        mode="contained"
                        buttonColor="#00C5E038"
                        onPress={() => Linking.openURL(`${data?.Link}`)}
                      >
                        Contribute
                      </Button>
                      <Button
                        className="w-32 border-2 border-cyan-500 m-2"
                        mode="contained"
                        buttonColor="#00C5E038"
                        onPress={onShare}
                      >
                        Share
                      </Button>
                    </View>
                    <View className="flex flex-row justify-center">
                      <Button
                        className="w-32 border-2 border-cyan-500 mx-2"
                        mode="contained"
                        buttonColor="#00C5E038"
                        onPress={() => {
                          Linking.openURL(`mailto:wildlifealertusa@gmail.com?`);
                        }}
                      >
                        Contact
                      </Button>
                      <Button
                        className="w-32 border-2 border-cyan-500 mx-2"
                        mode="contained"
                        buttonColor="#00C5E038"
                        onPress={() => Linking.openURL(`${data?.Merch}`)}
                      >
                        Merch
                      </Button>
                    </View>
                  </View>
                  <Text style={styles.text}>{data?.Action}</Text>
                </View>
              )}
            </Motion.View>
            <TouchableOpacity onPress={() => navigation.navigate("AnotherScreen")}>
              <Text className="text-blue-900 mt-20 font-semibold text-center">Privacy Policy & Terms</Text>
            </TouchableOpacity>
            {isConnected ? null : (
              <View className="flex-1 align-middle justify-end">
                <OfflineToast />
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    </ConditionalSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    maxHeight: screenHeight,
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
    overflow: "hidden",
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
    width: screenWidth / 1.4,
    alignSelf: "center",
    marginTop: 50,
    zIndex: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#57C4FF5B",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight / 2.5,
    height: "auto",
    borderWidth: 1,
    borderColor: "#00E0FFFF",
  },
});

export default About;
