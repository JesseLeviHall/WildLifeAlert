import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { View, Text, Button, FormControl, Switch, Input } from "native-base";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import OfflineToast from "../../components/OfflineToast";
import SuccessToast from "../../components/SuccessToast";
import SetRescuerLocationMap from "../../components/SetRescuerLocationMap";
import { useConnectivity } from "../../hooks/useConnectivity";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenHeight = Dimensions.get("window").height;

type RootStackParamList = {
  RescuerRegisterStepTwo: undefined;
};

type RescuerRegisterStepTwoProp = NavigationProp<
  RootStackParamList,
  "RescuerRegisterStepTwo"
>;

type Props = {
  navigation: RescuerRegisterStepTwoProp;
};
type Errors = {
  fullName: string;
  PhoneNumber: string;
  Location: string;
};
type UserLocation = {
  latitude: number;
  longitude: number;
};

const RescuerRegister = (props: Props) => {
  const navigation = useNavigation<RescuerRegisterStepTwoProp>();
  const isConnected = useConnectivity();
  const [showToast, setShowToast] = React.useState(false);
  const [fullName, setFullName] = React.useState<{ fullName: string }>({
    fullName: "",
  });
  const [Phone, setPhone] = React.useState<{
    PhoneNumber: string;
  }>({
    PhoneNumber: "",
  });
  const [Location, setLocation] = React.useState<UserLocation | null>(null);
  const [savedLocation, setSavedLocation] = React.useState<UserLocation | null>(
    null
  );
  const [errors, setErrors] = React.useState<Errors>({
    fullName: "",
    PhoneNumber: "",
    Location: "",
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Basic Info",
      headerTintColor: "#000000",
      headerStyle: { backgroundColor: "#71D1C7" },
    });
  });

  const validate = async () => {
    const phonePattern = /^[2-9]{1}[0-9]{2}-[0-9]{3}-[0-9]{4}$/;

    let updatedErrors = {
      fullName: "",
      PhoneNumber: "",
      Location: "",
    };

    if (fullName.fullName === "") {
      updatedErrors.fullName = "Name is required";
    } else if (fullName.fullName.length < 3) {
      updatedErrors.fullName = "Name should have at least 3 letters";
    }

    if (Phone.PhoneNumber === "") {
      updatedErrors.PhoneNumber = "Please enter your phone number";
      if (Phone.PhoneNumber === "") {
        updatedErrors.PhoneNumber = "Phone Number is required";
      } else if (!phonePattern.test(Phone.PhoneNumber)) {
        updatedErrors.PhoneNumber =
          "for phone number, use format: xxx-xxx-xxxx";
      }

      setErrors(updatedErrors);

      if (updatedErrors.fullName === "" && updatedErrors.PhoneNumber === "") {
        try {
          await AsyncStorage.setItem("fullName", fullName.fullName);
          await AsyncStorage.setItem("PhoneNumber", Phone.PhoneNumber);
          await AsyncStorage.setItem("Location", JSON.stringify(Location));
        } catch (err) {
          console.log(err);
        }
        return true;
      } else {
        return false;
      }
    }
  };

  const onSubmit = async () => {
    const isValid = await validate();
    if (isValid) {
      navigation.navigate("RescuerRegisterStepTwo");
    } else {
      console.log("validation failed");
    }
  };

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
      style={{ height: screenHeight }}
      colors={["#0E409C9E", "#71D1C74C", "#EB8705AF"]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex flex-1 items-center p-4 h-full w-full ">
          <Text>RescuerRegister Step 1</Text>
          <View style={{ flex: 1 }}>
            <SetRescuerLocationMap
              onLocationChange={setLocation}
              onLocationSave={handleLocationSave}
            />
            {showToast && <SuccessToast message="Location Saved" />}
          </View>

          <FormControl isRequired className="mb-2">
            <FormControl.Label
              _text={{
                bold: true,
                color: "black",
              }}
            >
              Full Name
            </FormControl.Label>
            <Input
              className=" bg-[#d4e1ea] w-2/3"
              placeholder="First & Last"
              variant="filled"
              autoComplete="name"
              onChangeText={(value) =>
                setFullName({ ...fullName, fullName: value })
              }
              onSubmitEditing={Keyboard.dismiss}
            />
            {"fullName" in errors ? (
              <FormControl.HelperText
                _text={{
                  fontSize: "xs",
                }}
              >
                {errors.fullName}
              </FormControl.HelperText>
            ) : null}
          </FormControl>
          <FormControl isRequired className="m-4">
            <FormControl.Label
              _text={{
                bold: true,
                color: "black",
              }}
            >
              Phone
            </FormControl.Label>
            <Input
              className=" bg-[#d4e1ea]"
              placeholder="Phone Number"
              variant="filled"
              autoComplete="tel"
              keyboardType="phone-pad"
              onChangeText={(value) =>
                setPhone({ ...Phone, PhoneNumber: value })
              }
              onSubmitEditing={Keyboard.dismiss}
            />
            {"PhoneNumber" in errors ? (
              <FormControl.HelperText
                _text={{
                  fontSize: "xs",
                }}
              >
                {errors.PhoneNumber}
              </FormControl.HelperText>
            ) : null}
          </FormControl>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RescuerRegisterStepTwo");
            }}
          >
            <Text
              className={`${location ? "" : "bg-gray-300"} items-center w-24`}
              disabled={!location}
              onPress={onSubmit}
            >
              Next
            </Text>
          </TouchableOpacity>
          {isConnected ? null : (
            <View className="flex-1 align-middle justify-end">
              <OfflineToast />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

export default RescuerRegister;
