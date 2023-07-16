import * as React from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { Button } from "native-base";
import AnimatedGradient from "../../components/background/GradientAnimated";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getWelcomeScreenContent } from "../../api/index";
import { useAuth } from "@clerk/clerk-expo";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";
import SpinnerComp from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";
import { Motion } from "@legendapp/motion";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type RootStackParamList = {
  RescuerLogin: undefined;
};
type RescuerLoginNavigationProp = NavigationProp<RootStackParamList, "RescuerLogin">;
type Props = {
  navigation: RescuerLoginNavigationProp;
};

const RescuerWelcome = (props: Props) => {
  const navigation = useNavigation<RescuerLoginNavigationProp>();
  const isConnected = useConnectivity();
  const { sessionId, getToken } = useAuth();
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      if (fetchedToken) {
        setToken(fetchedToken);
      }
    };
    fetchToken();
  }, []);

  const { isLoading, data, error } = useQuery(
    ["welcomescreen", sessionId, token],
    async () => {
      try {
        if (sessionId && token) {
          return await getWelcomeScreenContent(sessionId, token);
        } else {
          throw new Error("SessionId or token is missing");
        }
      } catch (error) {
        console.error("Error fetching welcome screen content:", error);
        return null;
      }
    },
    {
      enabled: !!sessionId && !!token && isConnected,
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
        <Button
          className="w-24 absolute bottom-24 border self-center border-cyan-500 "
          onPress={() => {
            navigation.navigate("RescuerLogin");
          }}
        >
          Exit
        </Button>
      </View>
    );
  }

  if (data === null) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error="Error fetching the alert details" />
        <Button
          className="w-24 absolute bottom-24 border self-center border-cyan-500 "
          onPress={() => {
            navigation.navigate("RescuerLogin");
          }}
        >
          Exit
        </Button>
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error="Sorry, error fetching data" />
        <Button
          className="w-24 absolute bottom-24 border self-center border-cyan-500 "
          onPress={() => {
            navigation.navigate("RescuerLogin");
          }}
        >
          Exit
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/desertbg.png")}
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
          className="mt-24 h-4/6 mx-4 rounded-lg px-4 items-center bg-[#00D1FFD1]"
        >
          <Text className="text-center text-2xl font-extrabold px-4 mt-8">{data?.Title}</Text>
          <Text className="text-center text-sm font-base px-4 mt-3">{data?.ThankYouMessage}</Text>
          <Text className="text-center text-sm font-base px-4 mt-3">{data?.DefaultSettingsInfo}</Text>
          <Text className="text-center text-sm font-base px-4 mt-3">{data?.MapInstructions}</Text>
          <Text className="text-center text-sm font-base px-4 mt-3">{data?.KindnessMessage}</Text>
          <Text className="text-center text-sm font-base px-4 mt-3">{data?.ResponsibilityMessage}</Text>
          <Text className="text-center text-sm font-base px-4 mt-3 mb-6">{data?.ClosingMessage}</Text>
        </Motion.View>
        <Button
          className="w-24 absolute bottom-24 border self-center border-cyan-500 "
          onPress={() => {
            navigation.navigate("RescuerLogin");
          }}
        >
          Done
        </Button>
        {isConnected ? null : (
          <View className="flex-1 align-middle justify-end ">
            <OfflineToast />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default RescuerWelcome;

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
