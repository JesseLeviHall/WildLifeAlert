import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query/build/lib";
import { useAuth } from "@clerk/clerk-expo";
import { registerRescuer } from "../../api/index";
import NightGradAnimated from "../../components/background/NightGradAnimated";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";
import SignUpWithOAuth from "../../components/SignUpWithOAuth";
import SignUpComponent from "../../components/SignUpComponent";

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
  const { sessionId, getToken } = useAuth();
  const [token, setToken] = React.useState("");
  const [userDetails, setUserDetails] = React.useState({
    FullName: "",
    Phone: "",
    Latitude: "",
    Longitude: "",
    Rehab: "",
    Medical: "",
    Professional: "",
    Organization: "",
  });

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
          ];
          const results = await AsyncStorage.multiGet(keys);

          const data = Object.fromEntries(results);
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
          };
          setUserDetails(dataWithDefaults);
        } catch (e) {
          console.log(e);
        }
      };
      fetchUserData();
    }, [])
  );

  const mutation = useMutation(registerRescuer, {
    onSuccess: () => {
      navigation.navigate("RescuerWelcome");
    },
    onError: (error) => {
      console.log("Error: ", error);
    },
  });

  const handleSubmit = async () => {
    if (mutation.isLoading || mutation.error) return;
    try {
      mutation.mutate(userDetails);
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

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
      <View style={styles.box}>
        <SignUpWithOAuth />
        <SignUpComponent />
        <TouchableOpacity
          className="border rounded-md w-full border-[#00E0FFFF] p-3 mb-4"
          onPress={handleSubmit}
        >
          <Text className="text-blue-200 text-center text-base font-bold">
            Complete Registration
          </Text>
        </TouchableOpacity>
        {isConnected ? null : (
          <View className="flex-1 align-middle justify-end">
            <OfflineToast />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default RescuerRegisterStepTwo;

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
    marginTop: screenHeight / 4.5,
    paddingHorizontal: 15,
    backgroundColor: "rgba(0, 224, 255, 0.3)",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight / 2.4,
    borderWidth: 1,
    borderColor: "#00E0FFFF",
  },
});
