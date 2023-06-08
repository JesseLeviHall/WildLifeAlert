import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { View, Text, Button } from "native-base";
import { FAB } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

type RootStackParamList = {
  ConfirmPost: undefined;
};
type ConfirmPostProp = NavigationProp<RootStackParamList, "ConfirmPost">;
type Props = {
  navigation: ConfirmPostProp;
};

const screenHeight = Dimensions.get("window").height;

const AddPhotos = (props: Props) => {
  const [photoBlob, setPhotoBlob] = React.useState<string[]>([]);

  const navigation = useNavigation<ConfirmPostProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Photos",
      headerTintColor: "#000000",
      headerStyle: { backgroundColor: "#71D1C7" },
    });
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      const newStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (newStatus.status !== "granted") {
        alert("Sorry, we need media library permissions to make this work!");
        return;
      }
    }
    // Clear previous selection
    await AsyncStorage.removeItem("photoBlob");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      try {
        let photoArray: string[] = [];

        for (let asset of result.assets) {
          const manipResult = await ImageManipulator.manipulateAsync(
            asset.uri,
            [{ resize: { width: 500 } }],
            { compress: 0.5, format: ImageManipulator.SaveFormat.PNG }
          );

          photoArray.push(manipResult.uri);
        }

        // Only save new photos if there are 3 or less in total
        if (photoArray.length <= 3) {
          await AsyncStorage.setItem("photoBlob", JSON.stringify(photoArray));
          setPhotoBlob(photoArray);
        } else {
          alert("Select up to 3 photos.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeImage = async (index: number) => {
    let newPhotoBlob = [...photoBlob];
    newPhotoBlob.splice(index, 1);
    await AsyncStorage.setItem("photoBlob", JSON.stringify(newPhotoBlob));
    setPhotoBlob(newPhotoBlob);
  };

  return (
    <LinearGradient
      style={{ height: screenHeight }}
      colors={["#6495ED70", "#71D1C74C", "#C6ED028C"]}
    >
      <View className="flex-1 items-center">
        <View className="mt-8 w-10/12 items-center p-6 bg-[#99bbe36e] rounded-lg border border-spacing-10 border-[#293b27fe]">
          <Text className="mb-3 font-bold text-2xl text-center">
            Do You Have Photos?
          </Text>
          <Text className=" font-bold text-center">
            Add up to 3 photos of the scene
          </Text>
          <Text className="text-xs mb-3">*Not Required</Text>
          <FAB
            accessibilityLabel="Choose Photos"
            icon="image-multiple"
            customSize={50}
            label={"Choose Photos"}
            className="w-2/3 h-12"
            onPress={pickImage}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 20, flexWrap: "wrap" }}>
          {photoBlob.map((uri, index) => (
            <View key={index} style={{ position: "relative", marginRight: 10 }}>
              <Image source={{ uri }} style={{ width: 100, height: 100 }} />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 5,
                  top: 5,
                  backgroundColor: "#99bbe36e",
                  borderRadius: 15,
                  width: 20,
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => removeImage(index)}
              >
                <Text style={{ color: "red", fontWeight: "bold" }}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Button
          className="mt-14 w-24"
          onPress={() => navigation.navigate("ConfirmPost")}
        >
          Next
        </Button>
      </View>
    </LinearGradient>
  );
};

export default AddPhotos;
