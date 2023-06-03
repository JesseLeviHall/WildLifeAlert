import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { View, Text, Button } from "native-base";
import SetAlertLocationMap from "../../components/SetAlertLocationMap";
import SuccessToast from "../../components/SuccessToast";

type RootStackParamList = {
  AddPhotos: undefined;
};
type AddPhotosProp = NavigationProp<RootStackParamList, "AddPhotos">;
type Props = {
  navigation: AddPhotosProp;
};
type UserLocation = {
  latitude: number;
  longitude: number;
};

const screenHeight = Dimensions.get("window").height;

const SetLocation = (props: Props) => {
  const [location, setLocation] = React.useState<UserLocation | null>(null);
  const [savedLocation, setSavedLocation] = React.useState<UserLocation | null>(
    null
  );
  const [showToast, setShowToast] = React.useState(false);
  const navigation = useNavigation<AddPhotosProp>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Set Location",
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

  const handleLocationSave = (
    locationIsSaved: boolean,
    savedLocation: UserLocation | null
  ) => {
    setLocation(savedLocation);
    if (locationIsSaved) {
      setSavedLocation(savedLocation);
    }
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#0DE69A", "#71D1C7", "#99BBE3"]}
    >
      <View style={{ flex: 1 }}>
        <SetAlertLocationMap
          onLocationChange={setLocation}
          onLocationSave={handleLocationSave}
        />
        {showToast && <SuccessToast message="Location Saved" />}
      </View>
      <View
        style={{
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <Button
          className={`${location ? "" : "bg-gray-300"} items-center w-24`}
          disabled={!location}
          onPress={() => navigation.navigate("AddPhotos")}
        >
          Next
        </Button>
      </View>
    </LinearGradient>
  );
};

export default SetLocation;
