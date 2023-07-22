import React from "react";
import { View, Alert } from "react-native";
import { Button, Dialog, Portal, Provider, FAB, Text } from "react-native-paper";
import { useMutation } from "@tanstack/react-query/build/lib";
import { SetLocationPref } from "../../api/index";
import SuccessToast from "../../components/SuccessToast";
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

const SetLocationDialogue = ({ visible, setVisible, LatitudeProp, LongitudeProp }: Props) => {
  const isConnected = useConnectivity();
  const { sessionId, getToken, signOut } = useAuth();
  const [error, setError] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [reqLoading, setReqLoading] = React.useState(false);
  const [location, setLocation] = React.useState<UserLocation | null>({
    latitude: LatitudeProp ? parseFloat(LatitudeProp) : 29.4241,
    longitude: LongitudeProp ? parseFloat(LongitudeProp) : -98.4936,
  });

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

  const mutation = useMutation(SetLocationPref, {
    onSuccess: () => {
      // Show the toast when the mutation is successful
      setShowToast(true);
      setReqLoading(false);
      setTimeout(() => {
        setShowToast(false);
      }, 1200);
    },
    onError: (error) => {
      console.error("Error: ", error);
    },
  });

  const handleSave = async () => {
    if (!isConnected) return;
    if (mutation.isLoading || mutation.error) return;
    if (location?.latitude === parseFloat(LatitudeProp) && location?.longitude === parseFloat(LongitudeProp)) return;
    if (!location) return;
    try {
      setError("");
      setReqLoading(true);
      const token = await getToken();
      if (sessionId && token !== null) {
        mutation.mutate({ sessionId, token, location });
      } else {
        throw new Error("Session ID, token, or user details is undefined");
      }
    } catch (err: any) {
      setError(err.errors[0].message);
      console.error(JSON.stringify(err, null, 2));
    }
  };

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
            {showToast && (
              <View
                style={{
                  position: "absolute",
                  zIndex: 10,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SuccessToast message="Location Changed" />
              </View>
            )}
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
                onPress={handleSave}
                loading={reqLoading}
                accessibilityLabel="Save"
                className="w-1/2 h-12"
                icon="check"
                label={"Save "}
                customSize={50}
              />
            </Dialog.Actions>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Close</Button>
            </Dialog.Actions>
          </View>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default SetLocationDialogue;
