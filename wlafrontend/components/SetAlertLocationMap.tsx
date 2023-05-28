import React, { useState, useEffect } from "react";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import * as Location from "expo-location";
import { View, TouchableOpacity, Alert, Platform } from "react-native";
import { Text, FAB } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserLocation = {
  latitude: number;
  longitude: number;
};
type SetAlertLocationMapProps = {
  onLocationChange: (location: UserLocation | null) => void;
  onLocationSave: (
    locationIsSaved: boolean,
    location: UserLocation | null
  ) => void;
};

export default function SetAlertLocationMap({
  onLocationChange,
  onLocationSave,
}: SetAlertLocationMapProps) {
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
    setIsLoading(true); // Add this line

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Error", "Permission to access location was denied");
      setIsLoading(false); // Add this line
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocation({ latitude, longitude });
    } catch (error) {
      Alert.alert("Error", "Could not get current location");
    }

    setIsLoading(false); // Add this line
  };

  const handleSaveLocation = async () => {
    try {
      await AsyncStorage.setItem("location", JSON.stringify(location));
      console.log("location saved", location);
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
    //onLocationChange(event.nativeEvent.coordinate);
  };

  return (
    <View className="flex-1">
      <View className="h-96">
        <MapView
          className="flex-1"
          initialRegion={{
            latitude: 39.5,
            longitude: -98.35,
            latitudeDelta: 50,
            longitudeDelta: 50,
          }}
          onPress={handleMapPress}
        >
          {location && <Marker coordinate={location} />}
        </MapView>
      </View>
      <View className="flex flex-col justify-center items-center py-4">
        <Text className="mb-3 font-bold text-2xl text-center">
          Where Is The Animal?
        </Text>
        <Text className="mb-3 font-bold text-center">tap the map or</Text>
        <FAB
          accessibilityLabel="Get Current Location"
          icon="crosshairs-gps"
          customSize={50}
          label={"Use Current Location"}
          className="w-1/2 h-12 mb-3"
          onPress={handleGetCurrentLocation}
          loading={isLoading}
        />

        <FAB
          accessibilityLabel="Save Location"
          icon="check"
          customSize={50}
          label={"Save Location"}
          className="w-1/2 h-12"
          onPress={handleSaveLocation}
          disabled={!location}
        />
      </View>
    </View>
  );
}
