import React, { useImperativeHandle, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";

interface Alert {
  id: string;
  position: string[];
}

interface PubMapViewProps {
  alerts: Alert[];
}

export interface PubMapViewHandle {
  onMapTypeChange: () => void;
}

const PubMapView = React.forwardRef<PubMapViewHandle, PubMapViewProps>(
  ({ alerts }, ref) => {
    const [mapType, setMapType] = useState<
      "standard" | "satellite" | "hybrid" | "terrain"
    >("hybrid");

    const onMapTypeChange = () => {
      setMapType((prevMapType) => {
        switch (prevMapType) {
          case "standard":
            return "satellite";
          case "satellite":
            return "hybrid";
          case "hybrid":
            return "terrain";
          case "terrain":
            return "standard";
        }
      });
    };

    useImperativeHandle(ref, () => ({
      onMapTypeChange,
    }));

    function Toast() {
      return (
        <View className="absolute mt-96 bg-[#bad1e8] opacity-50  p-2 rounded-xl self-center z-50">
          <Text className="text-lg font-semibold">Whew, No Alerts To Show</Text>
        </View>
      );
    }

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
          mapType={mapType}
        >
          {alerts.map((alert: Alert) => (
            <Marker
              pinColor="blue"
              key={alert.id}
              coordinate={{
                latitude: parseFloat(alert.position[0]),
                longitude: parseFloat(alert.position[1]),
              }}
            />
          ))}
        </MapView>
        {alerts.length === 0 && <Toast />}
      </View>
    );
  }
);

export default PubMapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
