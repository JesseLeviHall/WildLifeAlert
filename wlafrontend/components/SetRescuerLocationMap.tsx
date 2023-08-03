import React, { useState, useEffect } from "react";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import * as Location from "expo-location";
import { View, Alert, Dimensions } from "react-native";
import { Text, FAB } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type UserLocation = {
  latitude: number;
  longitude: number;
};

type SetRescuerLocationMapProps = {
  onLocationChange: (location: UserLocation | null) => void;
  onLocationSave: (locationIsSaved: boolean, location: UserLocation | null) => void;
};

export default function SetRescuerLocationMap({ onLocationChange, onLocationSave }: SetRescuerLocationMapProps) {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [locationExists, setLocationExists] = useState(false);
  const [locationSaved, setLocationSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSavedLocation = async () => {
      const savedLocation = await AsyncStorage.getItem("location");
      if (savedLocation) {
        setLocationExists(true);
      }
    };
    fetchSavedLocation();
  }, []);

  const handleGetCurrentLocation = async () => {
    setIsLoading(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Error", "Permission to access location was denied");
      setIsLoading(false);
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocation({ latitude, longitude });
    } catch (error) {
      Alert.alert("Error", "Could not get current location");
    }

    setIsLoading(false);
  };

  const handleSaveLocation = async () => {
    try {
      await AsyncStorage.setItem("location", JSON.stringify(location));
      onLocationSave(true, location); // Only call onLocationSave when saving the location
      setLocationSaved(true);

      // Resetting locationSaved state back to false after 2.5 seconds
      setTimeout(() => {
        setLocationSaved(false);
      }, 2500);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleMapPress = (event: MapPressEvent) => {
    setLocation(event.nativeEvent.coordinate);
  };

  return (
    <View style={{ width: screenWidth }}>
      <View style={{ height: screenHeight / 2.3 }}>
        <MapView
          className="flex-1"
          initialRegion={{
            latitude: 39.5,
            longitude: -98.35,
            latitudeDelta: 50,
            longitudeDelta: 50,
          }}
          mapType={"hybrid"}
          onPress={handleMapPress}
        >
          {location && <Marker coordinate={location} />}
        </MapView>
      </View>
      <View className="flex flex-col justify-center items-center py-4">
        <Text className="mb-2 font-bold text-2xl text-center">Please set your location for recieving alerts</Text>
        <Text className="mb-2  text-center">*This is never shared anywhere</Text>
        <Text className="mb-2  text-center">Tap the map or</Text>
        <FAB
          accessibilityLabel="Get Current Location"
          icon="crosshairs-gps"
          customSize={40}
          className="mb-3 w-7/12"
          label={"Use Current Location"}
          onPress={handleGetCurrentLocation}
          loading={isLoading}
        />

        <FAB
          accessibilityLabel="Save Location"
          icon="check"
          customSize={40}
          label={"Save "}
          className="w-7/12"
          onPress={handleSaveLocation}
          disabled={!location}
        />
      </View>
    </View>
  );
}
