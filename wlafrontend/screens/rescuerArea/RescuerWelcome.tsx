import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import AnimatedGradient from "../../components/background/GradientAnimated";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getWelcomeScreenContent } from "../../api/index";
import { useAuth } from "@clerk/clerk-expo";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";
import SkeletonComp from "../../components/Skeleton";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type RootStackParamList = {
  RescuerLogin: undefined;
};
type RescuerLoginNavigationProp = NavigationProp<
  RootStackParamList,
  "RescuerLogin"
>;
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
    () =>
      sessionId && token ? getWelcomeScreenContent(sessionId, token) : null,
    {
      enabled: !!sessionId && isConnected,
    }
  );

  if (isLoading) {
    return (
      <View className="flex-1 align-middle justify-center">
        <SkeletonComp />
      </View>
    );
  }

  if (data?.error) {
    return (
      <View className="flex-1 align-middle justify-center">
        <Text>{data?.error.message}</Text>
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
        <Text>{data?.Title}</Text>
        <Text>{data?.ThankYouMessage}</Text>
        <Text>{data?.DefaultSettingsInfo}</Text>
        <Text>{data?.MapInstructions}</Text>
        <Text>{data?.KindnessMessage}</Text>
        <Text>{data?.ResponsibilityMessage}</Text>
        <Text>{data?.ClosingMessage}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RescuerLogin");
          }}
        >
          <Text>Done</Text>
        </TouchableOpacity>
        {isConnected ? null : (
          <View className="flex-1 align-middle justify-end">
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
