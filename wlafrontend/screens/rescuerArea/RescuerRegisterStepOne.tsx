import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Keyboard, ScrollView, ViewStyle } from "react-native";
import { View, Switch, Text, Button, FormControl, Input } from "native-base";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenHeight = Dimensions.get("window").height;

type RootStackParamList = {
  RescuerRegisterStepTwo: undefined;
};

type RescuerRegisterStepOneProp = NavigationProp<RootStackParamList, "RescuerRegisterStepTwo">;

type Props = {
  navigation: RescuerRegisterStepOneProp;
};
type Errors = {
  fullName: string;
  PhoneNumber: string;
};

const RescuerRegisterStepOne = (props: Props) => {
  const navigation = useNavigation<RescuerRegisterStepOneProp>();
  const isConnected = useConnectivity();

  const [fullName, setFullName] = React.useState<{ fullName: string }>({
    fullName: "",
  });
  const [Phone, setPhone] = React.useState<{
    PhoneNumber: string;
  }>({
    PhoneNumber: "",
  });
  const [Medical, setMedical] = React.useState<boolean>(false);
  const [Rehab, setRehab] = React.useState<boolean>(false);
  const [Professional, setProfessional] = React.useState<boolean>(false);
  const [Organization, setOrganization] = React.useState<{
    Organization: string;
  }>({
    Organization: "",
  });

  const [errors, setErrors] = React.useState<Errors>({
    fullName: "",
    PhoneNumber: "",
  });

  const validate = async () => {
    const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

    let updatedErrors = {
      fullName: "",
      PhoneNumber: "",
    };

    if (fullName.fullName === "") {
      updatedErrors.fullName = "Name is required";
    } else if (fullName.fullName.length < 3) {
      updatedErrors.fullName = "Name should have at least 3 letters";
    }

    if (Phone.PhoneNumber === "") {
      updatedErrors.PhoneNumber = "Phone Number is required";
    } else if (!phonePattern.test(Phone.PhoneNumber)) {
      updatedErrors.PhoneNumber = "use format: xxx-xxx-xxxx";
    }

    setErrors(updatedErrors);

    if (updatedErrors.fullName === "" && updatedErrors.PhoneNumber === "") {
      try {
        await AsyncStorage.setItem("FullName", fullName.fullName);
        await AsyncStorage.setItem("Phone", Phone.PhoneNumber.replace(/-/g, ""));
        await AsyncStorage.setItem("Medical", Medical.toString());
        await AsyncStorage.setItem("Rehab", Rehab.toString());
        await AsyncStorage.setItem("Professional", Professional.toString());
        if (Professional) {
          await AsyncStorage.setItem("Organization", Organization.Organization);
        } else {
          await AsyncStorage.setItem("Organization", "");
        }
      } catch (err) {
        console.log(err);
      }
      return true;
    } else {
      return false;
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

  //handle switches
  const handleMedical = () => {
    setMedical(!Medical);
  };
  const handleRehab = () => {
    setRehab(!Rehab);
  };
  const handleProfessional = () => {
    setProfessional(!Professional);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Basic Info",
      headerTintColor: "#000000",
      headerStyle: { backgroundColor: "#71D1C7" },
    });
  });

  const contentContainerStyle: ViewStyle = {
    marginTop: "10%",
    alignSelf: "center",
    alignItems: "center",
    width: "80%",
    paddingHorizontal: 2,
  };

  return (
    <LinearGradient style={{ height: screenHeight }} colors={["#52B7FFDB", "#0E409C9E", "#EB8705AF"]}>
      <View className="flex-1 align-middle justify-center ">
        <Text className="text-center font-black uppercase mt-4 text-3xl">Basic Information</Text>
        <Text className="text-center font-light text-sm mb-2">(Never shared anywhere without your permission)</Text>
        <ScrollView contentContainerStyle={contentContainerStyle}>
          <View className="flex-1 align-middle justify-center pb-80 items-center w-full">
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
                maxLength={100}
                className=" bg-[#d4e1ea] w-2/3"
                placeholder="First & Last"
                variant="filled"
                autoComplete="name"
                onChangeText={(value) => setFullName({ ...fullName, fullName: value })}
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
            <FormControl isRequired className="mb-4">
              <FormControl.Label
                _text={{
                  bold: true,
                  color: "black",
                }}
              >
                Phone
              </FormControl.Label>
              <Input
                maxLength={20}
                className=" bg-[#d4e1ea]"
                placeholder="Phone Number"
                variant="filled"
                autoComplete="tel"
                keyboardType="numbers-and-punctuation"
                onChangeText={(value) => setPhone({ ...Phone, PhoneNumber: value })}
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
            <Text className="text-center font-black text-lg">
              Are you affiliated with a Wildlife Emergency or Protection Organization?
            </Text>
            <View className="flex-row row-span-1">
              <Text className={`text-center font-light my-1 mx-2 text-sm ${Professional ? "opacity-20" : "font-bold"}`}>
                No
              </Text>
              <Switch
                offTrackColor="indigo.100"
                onTrackColor="indigo.300"
                onThumbColor="indigo.500"
                offThumbColor="indigo.50"
                isChecked={Professional}
                onToggle={handleProfessional}
              />
              <Text className={`text-center font-light my-1 mx-2 text-sm ${Professional ? "font-bold" : "opacity-20"}`}>
                Yes
              </Text>
            </View>
            <FormControl className="mb-6">
              <FormControl.Label
                _text={{
                  bold: true,
                  color: "black",
                }}
              >
                Organization
              </FormControl.Label>
              <Input
                maxLength={100}
                className=" bg-[#d4e1ea]"
                placeholder="Optional"
                variant="filled"
                isDisabled={!Professional}
                onChangeText={(value) => setOrganization({ ...Organization, Organization: value })}
                onSubmitEditing={Keyboard.dismiss}
              />
              {"Organization" in errors ? (
                <FormControl.HelperText
                  _text={{
                    fontSize: "xs",
                  }}
                >
                  {errors.Organization}
                </FormControl.HelperText>
              ) : null}
            </FormControl>
            <Text className="text-center mb-1 font-black text-lg">
              Do you have training and experience in animal medical care?
            </Text>
            <View className="flex-row row-span-1">
              <Text className={`text-center font-light my-1 mx-2 text-sm ${Medical ? "opacity-20" : "font-bold"}`}>
                No
              </Text>
              <Switch
                offTrackColor="indigo.100"
                onTrackColor="indigo.300"
                onThumbColor="indigo.500"
                offThumbColor="indigo.50"
                isChecked={Medical}
                onToggle={handleMedical}
              />
              <Text className={`text-center font-light my-1 mx-2 text-sm ${Medical ? "font-bold" : "opacity-20"}`}>
                Yes
              </Text>
            </View>
            <Text className="text-center mt-6 mb-1 font-black text-lg">
              Do you have training and experience in Wildlife Rehabilitation?
            </Text>
            <View className="flex-row row-span-1">
              <Text className={`text-center font-light my-1 mx-2 text-sm ${Rehab ? "opacity-20" : "font-bold"}`}>
                No
              </Text>
              <Switch
                offTrackColor="indigo.100"
                onTrackColor="indigo.300"
                onThumbColor="indigo.500"
                offThumbColor="indigo.50"
                isChecked={Rehab}
                onToggle={handleRehab}
              />
              <Text className={`text-center font-light my-1 mx-2 text-sm ${Rehab ? "font-bold" : "opacity-20"}`}>
                Yes
              </Text>
            </View>
            <Button
              className="m-4 mt-16 border border-cyan-500  items-center w-24"
              onPress={onSubmit}
              colorScheme="cyan"
              _text={{ color: "white" }}
              _pressed={{
                backgroundColor: "cyan.400",
                _text: { color: "white" },
              }}
            >
              Next
            </Button>
          </View>
        </ScrollView>
        {isConnected ? null : (
          <View className="flex-1 align-middle justify-end">
            <OfflineToast />
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default RescuerRegisterStepOne;

/* 
when update basic info has been built:
 <Text className="text-center font-light mb-2 text-sm">
              (You can change these later)
            </Text>
            under organization question

*/
