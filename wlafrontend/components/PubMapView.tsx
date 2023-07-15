import React, { useImperativeHandle, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text, Modal, Pressable, Linking } from "react-native";
import { useUser } from "@clerk/clerk-expo";

interface Alert {
  id: string;
  FullName: string;
  Latitude: number;
  Longitude: number;
  Photo: string;
  PhoneNumber: string;
  Animal: string;
  Description: string;
  Email: string;
  ShareContact: boolean;
  Timestamp: string;
}

interface PubMapViewProps {
  alerts: Alert[];
}

export interface PubMapViewHandle {
  onMapTypeChange: () => void;
}

const PubMapView = React.forwardRef<PubMapViewHandle, PubMapViewProps>(({ alerts }, ref) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [mapType, setMapType] = useState<"standard" | "satellite" | "hybrid" | "terrain">("hybrid");

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

  const handleShowAlertDetails = (alert: Alert) => {
    if (!isLoaded || !isSignedIn) {
      return null;
    }
    const timeStamp = Number(alert.Timestamp);
    const date = new Date(timeStamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTimestamp = `${date.getMonth() + 1}/${date.getDate()}, ${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${amPm}`;
    setSelectedAlert({
      ...alert,
      Timestamp: formattedTimestamp,
    });
  };

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
            onPress={() => handleShowAlertDetails(alert)}
            pinColor="blue"
            key={alert.id}
            coordinate={{
              latitude: alert?.Latitude,
              longitude: alert?.Longitude,
            }}
          />
        ))}
      </MapView>
      {alerts.length === 0 && <Toast />}
      {selectedAlert && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectedAlert !== null}
          onRequestClose={() => {
            setSelectedAlert(null);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {selectedAlert.ShareContact && (
                <View>
                  <Text style={styles.modalText}>Posted by</Text>
                  <Text style={styles.modalName}>{selectedAlert.FullName}</Text>
                  <View style={styles.contactOptions}>
                    <Pressable
                      onPress={() => {
                        Linking.openURL(`tel:${selectedAlert.PhoneNumber}`);
                      }}
                    >
                      <Text style={styles.modalEmail}>Call</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        Linking.openURL(`sms:${selectedAlert.PhoneNumber}`);
                      }}
                    >
                      <Text style={styles.modalEmail}>Text</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        Linking.openURL(`mailto:${selectedAlert.Email}?`);
                      }}
                    >
                      <Text style={styles.modalEmail}>Email</Text>
                    </Pressable>
                  </View>
                </View>
              )}
              <Text style={styles.modalText}>Animal: {selectedAlert.Animal}</Text>
              <Text style={styles.modalText}>
                Description: {selectedAlert.Description.substring(0, 100)}
                {selectedAlert.Description.length > 100 ? "..." : ""}
              </Text>

              <Text style={styles.modalText}>Sent {selectedAlert.Timestamp}</Text>
              <View style={styles.contactOptions}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => console.log("details:", selectedAlert.id)}
                >
                  <Text style={styles.textStyle}>More</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setSelectedAlert(null)}>
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
});

export default PubMapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "80%",
    backgroundColor: "#bad1e8",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    width: "30%",
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#82A8CF",
  },
  buttonDetails: {
    backgroundColor: "#82A8CF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalName: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalEmail: {
    marginBottom: 15,
    textAlign: "center",
    color: "blue",
  },
  contactOptions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
});
