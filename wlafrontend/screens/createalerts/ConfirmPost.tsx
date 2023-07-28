import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, ScrollView, ViewStyle, SafeAreaView } from "react-native";
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
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
    //PhoneNumber: "",
    Email: "",
    ShareContact: "",
    Animal: "",
    Description: "",
    Latitude: "",
    Longitude: "",
    photoBlob: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const keys = [
            "FullName",
            // "PhoneNumber",
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
            // PhoneNumber: data.PhoneNumber || "",
            Email: data.Email || "",
            ShareContact: data.ShareContact || "",
            Animal: data.Animal || "",
            Description: data.Description || "",
            Latitude: locationData.latitude || "",
            Longitude: locationData.longitude || "",
            photoBlob: data.photoBlob ? JSON.parse(data.photoBlob) : [],
          };
          setUserDetails(dataWithDefaults);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserData();
    }, [])
  );

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
    alignItems: "center",
    alignSelf: "center",
    marginTop: 14,
    width: "80%",
    paddingHorizontal: 4,
    backgroundColor: "#99bbe36e",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#00E0FFFF",
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={{
          height: screenHeight,
        }}
        colors={["#0E409C9E", "#71D1C74C", "#EB8705AF"]}
      >
        <Text className="text-center mt-14 font-black uppercase text-3xl">Review Post</Text>
        <View className="flex-col mt-4 h-3/5">
          <ScrollView contentContainerStyle={contentContainerStyle}>
            <Text className="text-center mt-3 font-bold">{userDetails.Animal}</Text>
            <Text className="text-center font-light">{userDetails.Description}</Text>
            <View className=" h-8 items-center mt-3 ">
              <Chip icon="information">{userDetails.FullName}</Chip>
            </View>
            <View className=" h-8 items-center mt-3 ">
              <Chip icon="email">{userDetails.Email}</Chip>
            </View>
            <View className=" h-8 items-center mt-3 ">
              <Chip icon={userDetails.ShareContact == "true" ? "check" : "close"}>
                Allow Email Contact:
                {userDetails.ShareContact == "true" ? " Yes" : " No"}
              </Chip>
            </View>
            <View className=" h-8 items-center mt-3 ">
              <Chip icon={userDetails.Latitude && userDetails.Longitude ? "check" : "close"}>Location Saved</Chip>
            </View>
            <View className=" h-8 items-center mt-3 mb-4 ">
              <Chip icon={userDetails.photoBlob.length >= 1 ? "check" : "close"}>
                Photos? {userDetails.photoBlob.length >= 1 ? "Yes" : "No"}
              </Chip>
            </View>
          </ScrollView>
        </View>

        {showToast && (
          <View className="-mt-16 h-16 rounded-lg">
            <SuccessToast message="Alert Posted!" />
          </View>
        )}

        <View className="items-center">
          <Button
            leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />}
            isLoading={mutation.isLoading}
            isLoadingText="Submitting"
            isDisabled={disabled}
            className="mt-2 w-32"
            onPress={handleSendAlert}
          >
            Send Alert
          </Button>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ConfirmPost;

/* 
<View className=" h-8 items-center mt-3 ">
<Chip icon="phone">{userDetails.PhoneNumber}</Chip>
</View>
*/
