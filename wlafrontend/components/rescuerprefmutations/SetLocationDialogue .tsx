import React from "react";
import { View, Alert } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  Provider,
  FAB,
  Text,
} from "react-native-paper";
import { useMutation } from "@tanstack/react-query/build/lib";
import { useAuth } from "@clerk/clerk-expo";
import { useConnectivity } from "../../hooks/useConnectivity";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import * as Location from "expo-location";

type UserLocation = {
  latitude: number;
  longitude: number;
};

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  LatitudeProp: string;
  LongitudeProp: string;
};

const SetLocationDialogue = ({
  visible,
  setVisible,
  LatitudeProp,
  LongitudeProp,
}: Props) => {
  const isConnected = useConnectivity();
  const { sessionId, getToken, signOut } = useAuth();
  const [token, setToken] = React.useState<string | null>(null);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [location, setLocation] = React.useState<UserLocation | null>({
    latitude: LatitudeProp ? parseFloat(LatitudeProp) : 29.4241,
    longitude: LongitudeProp ? parseFloat(LongitudeProp) : -98.4936,
  });

  React.useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      if (fetchedToken) {
        setToken(fetchedToken);
      }
    };
    fetchToken();
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

  const handleMapPress = (event: MapPressEvent) => {
    setLocation(event.nativeEvent.coordinate);
  };

  //const mutation = useMutation(

  return (
    <Provider>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Set Your Location</Dialog.Title>
          <View className=" h-72">
            <MapView
              className="flex-1"
              initialRegion={{
                latitude: LatitudeProp ? parseFloat(LatitudeProp) : 29.4241,
                longitude: LongitudeProp ? parseFloat(LongitudeProp) : -98.4936,
                latitudeDelta: 0.25,
                longitudeDelta: 0.25,
              }}
              mapType={"hybrid"}
              onPress={handleMapPress}
            >
              {location && <Marker coordinate={location} />}
            </MapView>
          </View>
          <View className="flex align-middle justify-center items-center  mt-12">
            <Text className="mb-3 font-bold text-center">Tap the map or</Text>
            <Dialog.Actions>
              <FAB
                accessibilityLabel="Get Current Location"
                icon="crosshairs-gps"
                customSize={50}
                label={"Get Current Location"}
                className="w-1/2 h-12 mb-1"
                onPress={handleGetCurrentLocation}
                loading={isLoading}
              />
            </Dialog.Actions>
            <Dialog.Actions>
              <FAB
                className="w-1/2 h-12"
                icon="check"
                label={"Save "}
                customSize={50}
              />
            </Dialog.Actions>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Cancel</Button>
            </Dialog.Actions>
          </View>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default SetLocationDialogue;
