import * as React from "react";
import { View, Dimensions, ImageBackground, Platform, StyleSheet, Keyboard, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
import NightGradAnimated from "../../components/background/NightGradAnimated";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";
import SignUpWithOAuth from "../../components/SignUpWithOAuth";
import SignUpWithApple from "../../components/SignUpWithApple";
import SignUpComponent from "../../components/SignUpComponent";
import ConditionalSafeAreaView from "../../components/ConditionalSafeArea";
import * as Device from "expo-device";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type RootStackParamList = {
  RescuerWelcome: undefined;
};

type RescuerWelcomeProp = NavigationProp<RootStackParamList, "RescuerWelcome">;

type Props = {
  navigation: RescuerWelcomeProp;
};

const RescuerRegisterStepTwo = (props: Props) => {
  const navigation = useNavigation<RescuerWelcomeProp>();
  const isConnected = useConnectivity();
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    FullName: "",
    Phone: "",
    Latitude: "",
    Longitude: "",
    Rehab: "",
    Medical: "",
    Professional: "",
    Organization: "",
    expoPushToken: "",
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Authentication",
      headerTintColor: "#000000",
      headerStyle: { backgroundColor: "#71D1C7" },
    });
  });

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setKeyboardOpen(true));

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setKeyboardOpen(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const keys = [
            "FullName",
            "Phone",
            "location",
            "Rehab",
            "Medical",
            "Professional",
            "Organization",
            "expoPushToken",
          ];
          const results = await AsyncStorage.multiGet(keys);

          const data: Record<string, string> = {};
          results.forEach(([key, value]) => {
            data[key] = value ? value : "";
          });
          const locationData = data.location ? JSON.parse(data.location) : {};
          const dataWithDefaults = {
            FullName: data.FullName || "",
            Phone: data.Phone || "",
            Latitude: locationData.latitude || "",
            Longitude: locationData.longitude || "",
            Rehab: data.Rehab || "",
            Medical: data.Medical || "",
            Professional: data.Professional || "",
            Organization: data.Organization || "",
            expoPushToken: data.expoPushToken || "",
          };
          setUserDetails(dataWithDefaults);
        } catch (e) {
          console.log(e);
        }
      };
      fetchUserData();
    }, [])
  );

  const isIPhoneSE = screenHeight < 844 ? true : false;

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
        <View style={keyboardOpen ? styles.containerWithKeyboard : styles.container}>
          <View style={isIPhoneSE ? styles.smallBox : styles.box}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              {Platform.OS === "ios" && <SignUpWithApple navigation={navigation} userDetails={userDetails} />}
              <SignUpWithOAuth navigation={navigation} userDetails={userDetails} />
              <SignUpComponent navigation={navigation} userDetails={userDetails} />
              {isConnected ? null : (
                <View className="flex-1 align-middle justify-end">
                  <OfflineToast />
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </ConditionalSafeAreaView>
  );
};

export default RescuerRegisterStepTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
  },
  background: {
    position: "absolute",
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    zIndex: -10,
  },
  containerWithKeyboard: {
    flex: 1,
    marginTop: -150,
    width: screenWidth,
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight / 5,
    paddingHorizontal: 15,
    backgroundColor: "rgba(0, 224, 255, 0.3)",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight / 2.2,
    borderWidth: 1,
    borderColor: "#00E0FFFF",
  },
  smallBox: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0, 224, 255, 0.3)",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight - 250,
  },
});
