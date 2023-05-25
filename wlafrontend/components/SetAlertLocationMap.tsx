import React, { useState } from 'react';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, View, Text, Button, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Location = {
  latitude: number;
  longitude: number;
};
type SetAlertLocationMapProps = {
    onLocationSet: (locationSet: boolean) => void;
  };

export default function SetAlertLocationMap({ onLocationSet }: SetAlertLocationMapProps) {
  const [location, setLocation] = useState<Location | null>(null);

  const handleGetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Error', 'Permission to access location was denied');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocation({ latitude, longitude });
    } catch (error) {
      Alert.alert('Error', 'Could not get current location');
    }
  };


  const handleSaveLocation = async () => {
    try {
      await AsyncStorage.setItem('location', JSON.stringify(location));
     console.log('Location saved successfully!', location);
        onLocationSet(true);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleMapPress = (event: MapPressEvent) => {
    setLocation(event.nativeEvent.coordinate);
  };
  

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 39.5,
          longitude: -98.35,
          latitudeDelta: 50,
          longitudeDelta: 50,
        }}
        style={styles.map}
        onPress={handleMapPress}>
        {location && <Marker coordinate={location} />}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Get Current Location" onPress={handleGetCurrentLocation} />
        <Button title="Save Location" onPress={handleSaveLocation} disabled={!location} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
  },
});