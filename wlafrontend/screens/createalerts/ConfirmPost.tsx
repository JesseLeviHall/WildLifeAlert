import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, ScrollView, FlexAlignType, ViewStyle } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { View, Text, Button, Icon } from "native-base";
import { Chip } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query/build/lib";
import { postNewAlert } from "../../api/index";
import SuccessToast from "../../components/SuccessToast";

type RootStackParamList = {
  NextSteps: undefined;
};
type NextStepsProp = NavigationProp<RootStackParamList, "NextSteps">;
type Props = {
  navigation: NextStepsProp;
};
const screenHeight = Dimensions.get("window").height;

const ConfirmPost = (props: Props) => {
  const [showToast, setShowToast] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
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
      // Show the toast when the mutation is successful
      setShowToast(true);
      setDisabled(true);
      // After 2 seconds, hide the toast and navigate to the next screen
      setTimeout(() => {
        setShowToast(false);
        setDisabled(false);
        props.navigation.navigate("NextSteps");
      }, 1200);
    },
    onError: (error) => {
      console.error("Error: ", error);
    },
  });

  const handleSendAlert = async () => {
    if (mutation.isLoading || mutation.error) return;
    try {
      mutation.mutate({
        userDetails,
        photoBlob: userDetails.photoBlob || null,
      });
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
      <Text className="text-center mt-24 font-black uppercase text-3xl">
        Review and Submit
      </Text>
      <View className="flex-1 items-center p-4 h-full w-full ">
        <ScrollView contentContainerStyle={contentContainerStyle}>
          <View className=" w-full px-12 bg-[#99bbe36e] rounded-lg border border-[#293b27fe]">
            <Text className="text-center mt-3 font-semibold">
              {userDetails.Animal}
            </Text>
            <Text className="text-center font-light">
              {userDetails.Description}
            </Text>
            <View className=" h-8 items-center mt-3 ">
              <Chip icon="information">{userDetails.FullName}</Chip>
            </View>
            <View className=" h-8 items-center mt-3 ">
              <Chip icon="phone">{userDetails.PhoneNumber}</Chip>
            </View>
            <View className=" h-8 items-center mt-3 ">
              <Chip icon="email">{userDetails.Email}</Chip>
            </View>
            <View className=" h-8 items-center mt-3 ">
              <Chip
                icon={userDetails.ShareContact == "true" ? "check" : "close"}
              >
                Share Contact Info:{" "}
                {userDetails.ShareContact == "true" ? "Yes" : "No"}
              </Chip>
            </View>

            <View className=" h-8 items-center mt-3 ">
              <Chip
                icon={
                  userDetails.Latitude && userDetails.Longitude
                    ? "check"
                    : "close"
                }
              >
                Location Saved
              </Chip>
            </View>
            <View className=" h-8 items-center mt-3 mb-6 ">
              <Chip icon={userDetails.photoBlob ? "check" : "close"}>
                Photos? {userDetails.photoBlob ? "Yes" : "No"}
              </Chip>
            </View>

            {showToast && <SuccessToast message="Alert Posted!" />}
          </View>
          <Button
            leftIcon={
              <Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
            }
            isLoading={mutation.isLoading}
            isLoadingText="Submitting"
            isDisabled={disabled}
            className="mt-6 w-32"
            onPress={handleSendAlert}
          >
            Send Alert
          </Button>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default ConfirmPost;
