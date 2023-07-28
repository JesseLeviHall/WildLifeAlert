import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, SafeAreaView } from "react-native";
import { View, Button } from "native-base";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import OfflineToast from "../../components/OfflineToast";
import SuccessToast from "../../components/SuccessToast";
import SetRescuerLocationMap from "../../components/SetRescuerLocationMap";
import { useConnectivity } from "../../hooks/useConnectivity";

const screenHeight = Dimensions.get("window").height;

type RootStackParamList = {
  RescuerRegisterStepOne: undefined;
};

type RescuerRegisterStepProp = NavigationProp<RootStackParamList, "RescuerRegisterStepOne">;

type Props = {
  navigation: RescuerRegisterStepProp;
};

type UserLocation = {
  latitude: number;
  longitude: number;
};

const RescuerRegister = (props: Props) => {
  const navigation = useNavigation<RescuerRegisterStepProp>();
  const isConnected = useConnectivity();
  const [showToast, setShowToast] = React.useState(false);
  const [Location, setLocation] = React.useState<UserLocation | null>(null);
  const [savedLocation, setSavedLocation] = React.useState<UserLocation | null>(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Your Turf",
      headerTintColor: "#000000",
      headerStyle: { backgroundColor: "#71D1C7" },
    });
  });

  React.useEffect(() => {
    if (savedLocation) {
      setShowToast(true);
      const timerId = setTimeout(() => {
        setShowToast(false);
      }, 1200);
      return () => clearTimeout(timerId);
    }
  }, [savedLocation]);

  const handleLocationSave = (locationIsSaved: boolean, savedLocation: UserLocation | null) => {
    setLocation(savedLocation);
    if (locationIsSaved) {
      setSavedLocation(savedLocation);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient style={{ height: screenHeight }} colors={["#24008CFF", "#0E409C9E", "#EB8705AF"]}>
        <View className="flex flex-1 items-center h-full w-full ">
          <SetRescuerLocationMap onLocationChange={setLocation} onLocationSave={handleLocationSave} />
          <View className=" h-16">{showToast && <SuccessToast message="Location Saved" />}</View>
          <Button
            className={`${Location ? "" : "bg-gray-300"} border border-cyan-500 items-center w-24 -mt-6`}
            disabled={!Location}
            onPress={() => navigation.navigate("RescuerRegisterStepOne")}
          >
            Next
          </Button>
          {isConnected ? null : (
            <View className="flex-1 align-middle  justify-end">
              <OfflineToast />
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default RescuerRegister;
