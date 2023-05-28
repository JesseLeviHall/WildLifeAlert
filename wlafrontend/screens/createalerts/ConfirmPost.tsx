import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, ScrollView, FlexAlignType, ViewStyle } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { View, Text, Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query/build/lib";
import { postNewAlert } from "../../api/index";

type RootStackParamList = {
  NextSteps: undefined;
};
type NextStepsProp = NavigationProp<RootStackParamList, "NextSteps">;
type Props = {
  navigation: NextStepsProp;
};
const screenHeight = Dimensions.get("window").height;

const ConfirmPost = (props: Props) => {
  const [userDetails, setUserDetails] = React.useState({
    FullName: "",
    PhoneNumber: "",
    Email: "",
    ShareContact: "",
    Animal: "",
    Description: "",
    Latitude: "",
    Longitude: "",
    photoBlob: "",
  });

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const keys = [
          "FullName",
          "PhoneNumber",
          "Email",
          "ShareContact",
          "Animal",
          "Description",
          "location",
          "photoBlob",
        ];
        const results = await AsyncStorage.multiGet(keys);
        const data = Object.fromEntries(results);
        const locationData = data.location ? JSON.parse(data.location) : {};
        const dataWithDefaults = {
          FullName: data.FullName || "",
          PhoneNumber: data.PhoneNumber || "",
          Email: data.Email || "",
          ShareContact: data.ShareContact || "",
          Animal: data.Animal || "",
          Description: data.Description || "",
          Latitude: locationData.latitude || "",
          Longitude: locationData.longitude || "",
          photoBlob: data.photoBlob || "",
        };
        setUserDetails(dataWithDefaults);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const mutation = useMutation(postNewAlert, {
    onSuccess: () => {
      props.navigation.navigate("NextSteps");
    },
    onError: (error) => {
      console.error("Error: ", error);
    },
    retry: 3,
  });

  const handleSendAlert = async () => {
    if (mutation.isLoading || mutation.error) return;
    try {
      mutation.mutate({ userDetails, photoBlob: userDetails.photoBlob });
    } catch (error) {
      console.error("Error sending alert: ", error);
    }
  };

  const navigation = useNavigation<NextStepsProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Confirm",
      headerTintColor: "#000000",
      headerStyle: { backgroundColor: "#71D1C7" },
    });
  });

  const contentContainerStyle: ViewStyle = {
    alignItems: "center" as FlexAlignType,
    width: "100%",
  };

  return (
    <LinearGradient
      style={{ height: screenHeight }}
      colors={["#0DE69A", "#71D1C7", "#99BBE3"]}
    >
      <Text className="text-center mt-6 font-black uppercase text-3xl">
        Review and Submit
      </Text>
      <View className="flex-1 items-center p-4 h-full w-full ">
        <ScrollView contentContainerStyle={contentContainerStyle}>
          <View className=" w-full px-6 bg-[#99bbe36e] rounded-lg border border-spacing-10 border-[#293b27fe]">
            <Text className="text-center mt-3  text-lg">
              {userDetails.FullName}
            </Text>
            <Text className="text-center mt-3  text-lg">
              {userDetails.PhoneNumber}
            </Text>
            <Text className="text-center mt-3  text-lg">
              {userDetails.Email}
            </Text>
            <Text className="text-center mt-3  text-lg">
              Share Contact Info: {userDetails.ShareContact}
            </Text>
            <Text className="text-center mt-3  text-lg">
              Animal: {userDetails.Animal}
            </Text>
            <Text className="text-center mt-3  text-lg">
              Description: {userDetails.Description}
            </Text>
            <Text className="text-center mt-3 text-lg">
              Location Saved?{" "}
              {userDetails.Latitude && userDetails.Longitude
                ? "Yes"
                : "No location selected"}
            </Text>
            <Text className="text-center mt-3  text-lg">
              Photos? {userDetails.photoBlob ? "Yes" : "No"}
            </Text>
          </View>
          <Button className="mt-6 w-24" onPress={handleSendAlert}>
            Send Alert
          </Button>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default ConfirmPost;
