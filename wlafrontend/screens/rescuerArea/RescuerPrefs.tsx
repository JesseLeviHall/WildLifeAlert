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
import AccountDeleteDialogue from "../../components/rescuerprefmutations/AccountDeleteDialogue";
import SetLocationDialogue from "../../components/rescuerprefmutations/SetLocationDialogue ";
import ConditionalSafeAreaView from "../../components/ConditionalSafeArea";
import ErrorMessage from "../../components/ErrorMessage";
import * as Device from "expo-device";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type RootStackParamList = {
  Home: undefined;
};

type HomeScreenProp = NavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenProp;
};

const RescuerPrefs = (props: Props) => {
  const navigation = useNavigation<HomeScreenProp>();
  const isConnected = useConnectivity();
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [changeLocation, setChangeLocation] = React.useState(false);
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
    async () => {
      try {
        if (sessionId && token) {
          return await getRescuerProfile(sessionId, token);
        } else {
          throw new Error("SessionId or token is missing");
        }
      } catch (error) {
        console.error("Error fetching rescuer prefs:", error);
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
        <Button onPress={navigation.goBack} className="w-24 absolute bottom-32 border self-center border-cyan-500 ">
          Back
        </Button>
      </View>
    );
  }

  if (data === null) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error="Sorry! An error occured fetching user data" />
        <Button onPress={navigation.goBack} className="w-24 absolute bottom-32 border self-center border-cyan-500 ">
          Back
        </Button>
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error="Sorry, error fetching data" />
        <Button onPress={navigation.goBack} className="w-24 absolute bottom-32 border self-center border-cyan-500 ">
          Back
        </Button>
      </View>
    );
  }

  const isIPhoneSE = screenHeight < 844 ? true : false;

  const toggleDialogVisible = () => setDialogVisible(!dialogVisible);
  const toggleChangeLocation = () => setChangeLocation(!changeLocation);

  return (
    <ConditionalSafeAreaView>
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
          <Text className="font-bold text-lg text-blue-50 text-center">Set Your Preferences</Text>
        </View>
        {changeLocation && (
          <View
            style={{
              position: "absolute",
              width: screenWidth,
              height: screenHeight,
              zIndex: 10,
            }}
          >
            <SetLocationDialogue
              visible={changeLocation}
              setVisible={toggleChangeLocation}
              LatitudeProp={data?.Latitude}
              LongitudeProp={data?.Longitude}
            />
          </View>
        )}
        {dialogVisible && (
          <View
            style={{
              position: "absolute",
              width: screenWidth,
              height: screenHeight,
              zIndex: 10,
            }}
          >
            <AccountDeleteDialogue navigation={navigation} visible={dialogVisible} setVisible={toggleDialogVisible} />
          </View>
        )}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={isIPhoneSE ? styles.smallBox : styles.box}>
            <SetRescuerLocation
              isOpen={toggleChangeLocation}
              LatitudeProp={data?.Latitude}
              LongitudeProp={data?.Longitude}
            />
            <Divider my="2" opacity={30} />
            <SetNotifications notificationProp={data?.Notifications} />
            <Divider my="2" opacity={30} />
            <SetGeoRadius geoRadiusProp={data?.Radius} />
            <Divider my="2" opacity={30} />
            <DeleteAccount toggleDialog={toggleDialogVisible} />
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`mailto:wildlifealertusa@gmail.com?`);
              }}
              className="justify-center items-center align-bottom border border-cyan-500 rounded-full"
            >
              <Text className="text-base text-center py-2 px-8 text-white font-thin">
                Feedback, or Report a Problem
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        {isConnected ? null : (
          <View className="flex-1 align-middle justify-center">
            <OfflineToast />
          </View>
        )}
        <Button onPress={navigation.goBack} className="w-24 mt-6 border self-center border-cyan-500 ">
          Back
        </Button>
      </ImageBackground>
    </ConditionalSafeAreaView>
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
    marginTop: 15,
    backgroundColor: "rgba(0, 224, 255, 0.3)",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight - 350,
  },
  smallBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
    backgroundColor: "rgba(0, 224, 255, 0.3)",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight - 200,
  },
});
