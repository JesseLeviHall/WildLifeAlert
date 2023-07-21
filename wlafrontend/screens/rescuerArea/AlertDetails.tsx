import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground, Dimensions } from "react-native";
import AnimatedGradient from "../../components/background/GradientAnimated";
import { Button } from "native-base";
import { useAuth } from "@clerk/clerk-expo";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getAlertDetails } from "../../api/index";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";
import SpinnerComp from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type StackParams = {
  AlertDetails: { alertId: string };
};

type AlertDetailsScreenRouteProp = RouteProp<StackParams, "AlertDetails">;
type AlertDetailsNavigationProp = NativeStackNavigationProp<StackParams, "AlertDetails">;

type Props = {
  route: AlertDetailsScreenRouteProp;
  navigation: AlertDetailsNavigationProp;
};

const AlertDetails: React.FC<Props> = ({ route, navigation }) => {
  const { sessionId, getToken } = useAuth();
  const isConnected = useConnectivity();
  const [token, setToken] = React.useState<string | null>(null);
  const { alertId } = route.params;

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
    ["alertdetails", sessionId, token, alertId],
    async () => {
      try {
        if (sessionId && token) {
          return await getAlertDetails({ sessionId, token, alertId });
        } else {
          throw new Error("SessionId or token is missing");
        }
      } catch (error) {
        console.error("Error fetching alert details:", error);
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
          onPress={() => navigation.goBack()}
        >
          <Text>Go back</Text>
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
          onPress={() => navigation.goBack()}
        >
          <Text>Go back</Text>
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
          onPress={() => navigation.goBack()}
        >
          <Text>Go back</Text>
        </Button>
      </View>
    );
  }

  /*  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Details",
      headerTintColor: "#000000",
      headerStyle: { backgroundColor: "#71D1C7" },
    });
  }); */

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
      </ImageBackground>
      <Text>AlertDetails: {alertId}</Text>
      <Text>DetailsResponse: {data?.FullName}</Text>
    </View>
  );
};

export default AlertDetails;

/* 
  {data?.Photo &&
        data.Photo.map((photoObj: { id: number; url: string }) => (
          <Image
            key={photoObj.id}
            source={{ uri: photoObj.url }}
            style={{ width: 150, height: 150, marginBottom: 10 }}
          />
        ))}
*/

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
