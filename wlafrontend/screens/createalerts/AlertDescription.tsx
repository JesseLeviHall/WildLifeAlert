import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { View, Text, Button, FormControl, Input, TextArea } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  SetLocation: undefined;
};
type SetLocationProp = NavigationProp<RootStackParamList, "SetLocation">;
type Props = {
  navigation: SetLocationProp;
};
type Errors = {
  Animal: string;
  Description: string;
};
const screenHeight = Dimensions.get("window").height;

const AlertDescription = (props: Props) => {
  const [Animal, setAnimal] = React.useState<{ Animal: string }>({
    Animal: "",
  });
  const [Description, setDescription] = React.useState<{
    Description: string;
  }>({
    Description: "",
  });

  const [errors, setErrors] = React.useState<Errors>({
    Animal: "",
    Description: "",
  });

  const validate = async () => {
    let updatedErrors = {
      Animal: "",
      Description: "",
    };

    if (Animal.Animal === "") {
      updatedErrors.Animal = "Type of Animal is required";
    } else if (Description.Description === "") {
      updatedErrors.Description = "Description is required";
    }
    setErrors(updatedErrors);
    if (updatedErrors.Animal === "" && updatedErrors.Description === "") {
      try {
        await AsyncStorage.setItem("Animal", Animal.Animal);
        await AsyncStorage.setItem("Description", Description.Description);
      } catch (error) {
        console.log("Error saving data", error);
      }
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async () => {
    const isValid = await validate();
    if (isValid) {
      navigation.navigate("SetLocation");
    } else {
      console.log("Validation Failed");
    }
  };

  const navigation = useNavigation<SetLocationProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Description",
      headerTintColor: "#000000",
      headerStyle: { backgroundColor: "#71D1C7" },
    });
  });
  return (
    <LinearGradient
      style={{ height: screenHeight }}
      colors={["#0DE69A", "#71D1C7", "#99BBE3"]}
    >
      <Text className="text-center mt-6 font-black uppercase text-4xl">
        What is happening?
      </Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 items-center p-4 h-full w-full ">
          <View className=" w-10/12 items-center p-6 bg-[#99bbe36e] rounded-lg border border-spacing-10 border-[#293b27fe]">
            <FormControl isRequired className="mb-4">
              <FormControl.Label
                _text={{
                  bold: true,
                  color: "black",
                }}
              >
                What Animal?
              </FormControl.Label>
              <Input
                className=" bg-[#d4e1ea] w-2/3"
                placeholder="Example: Porcupine"
                variant="filled"
                onChangeText={(value) =>
                  setAnimal({ ...Animal, Animal: value })
                }
              />
              {"Animal" in errors ? (
                <FormControl.HelperText
                  _text={{
                    fontSize: "xs",
                  }}
                >
                  {errors.Animal}
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
                Description
              </FormControl.Label>
              <TextArea
                h={40}
                placeholder="what is the condition of the animal"
                variant="filled"
                w="100%"
                maxW="300"
                autoCompleteType={"text"}
                onChangeText={(text) => setDescription({ Description: text })}
              />
              {"Description" in errors ? (
                <FormControl.HelperText
                  _text={{
                    fontSize: "xs",
                  }}
                >
                  {errors.Description}
                </FormControl.HelperText>
              ) : null}
            </FormControl>
            <Button className=" w-24" onPress={onSubmit}>
              Next
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

export default AlertDescription;
