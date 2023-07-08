import * as React from "react";
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Button, Divider } from "native-base";
import NightGradAnimated from "../../components/background/NightGradAnimated";
import {
  SetRescuerLocation,
  SetGeoRadius,
  SetNotifications,
  DeleteAccount,
} from "../../components/rescuerprefmutations/Pref_Comp_index";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import OfflineToast from "../../components/OfflineToast";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getRescuerProfile } from "../../api/index";
import { useConnectivity } from "../../hooks/useConnectivity";
import { useAuth } from "@clerk/clerk-expo";
import SpinnerComp from "../../components/Spinner";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type Props = {};

const RescuerPrefs = (props: Props) => {
  const navigation = useNavigation();
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
    ["rescuerprefs", sessionId, token],
    () => (sessionId && token ? getRescuerProfile(sessionId, token) : null),
    {
      enabled: !!sessionId && isConnected,
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
        <Text>{data?.error.message}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/resbasecamp.png")}
      style={{
        height: screenHeight,
        width: screenWidth,
        margin: 0,
        padding: 0,
        alignItems: "center",
      }}
    >
      <View style={styles.background}>
        <NightGradAnimated />
      </View>
      <View className="mt-16 mb-12 h-9 w-60 border border-blue-50 align-middle justify-center items-center  bg-[#24008CFF] rounded-xl">
        <Text className="font-bold text-lg text-blue-50 text-center">
          Set Your Preferences
        </Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.box}>
          <SetRescuerLocation />
          <Divider my="2" bg="blueGray.900" />
          <SetNotifications notificationProp={data?.Notifications} />
          <Divider my="2" bg="blueGray.900" />
          <SetGeoRadius geoRadiusProp={data?.Radius} />
          <Divider my="2" bg="blueGray.900" />
          <DeleteAccount />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`mailto:wildlifealertusa@gmail.com?`);
            }}
            className="justify-center align-middle items-center"
          >
            <Text>Feedback, or Report a Problem</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      {isConnected ? null : (
        <View className="flex-1 align-middle justify-center">
          <OfflineToast />
        </View>
      )}
      <Button
        onPress={navigation.goBack}
        className="w-24 absolute bottom-32 border self-center border-cyan-500 "
      >
        Back
      </Button>
    </ImageBackground>
  );
};

export default RescuerPrefs;

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
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "rgba(0, 224, 255, 0.3)",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight / 1.8,
    borderWidth: 1,
    borderColor: "#00E0FFFF",
  },
});
