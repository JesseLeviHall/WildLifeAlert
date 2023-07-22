import React from "react";
import * as Clipboard from "expo-clipboard";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  ImageBackground,
  Dimensions,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import AnimatedGradient from "../../components/background/GradientAnimated";
import { Button } from "native-base";
import { Chip } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "@clerk/clerk-expo";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getAlertDetails } from "../../api/index";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";
import SpinnerComp from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessToast from "../../components/SuccessToast";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type StackParams = {
  AlertDetails: { alertId: string };
};

type AlertDetailsScreenRouteProp = RouteProp<StackParams, "AlertDetails">;
type AlertDetailsNavigationProp = NativeStackNavigationProp<StackParams, "AlertDetails">;

type Props = {
  route: AlertDetailsScreenRouteProp;
  navigation: AlertDetailsNavigationProp;
};

const AlertDetails: React.FC<Props> = ({ route, navigation }) => {
  const { sessionId, getToken } = useAuth();
  const isConnected = useConnectivity();
  const [token, setToken] = React.useState<string | null>(null);
  const { alertId } = route.params;
  const [showToast, setShowToast] = React.useState(false);
  const [isImageModalVisible, setImageModalVisible] = React.useState(false);
  const [selectedImageUri, setSelectedImageUri] = React.useState<string | null>(null);

  const openImageModal = (uri: string) => {
    setSelectedImageUri(uri);
    setImageModalVisible(true);
  };

  const closeImageModal = () => {
    setSelectedImageUri(null);
    setImageModalVisible(false);
  };

  React.useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      if (fetchedToken) {
        setToken(fetchedToken);
      }
    };
    fetchToken();
  }, []);

  const { isLoading, data, error } = useQuery(
    ["alertdetails", sessionId, token, alertId],
    async () => {
      try {
        if (sessionId && token) {
          return await getAlertDetails({ sessionId, token, alertId });
        } else {
          throw new Error("SessionId or token is missing");
        }
      } catch (error) {
        console.error("Error fetching alert details:", error);
        return null;
      }
    },
    {
      enabled: !!sessionId && !!token && isConnected,
    }
  );

  if (isLoading) {
    return (
      <View className="flex-1 align-middle justify-center">
        <SpinnerComp />
      </View>
    );
  }

  if (data?.error) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error={data?.error.message} />
        <Button
          className="w-24 absolute bottom-24 border self-center border-cyan-500 "
          onPress={() => navigation.goBack()}
        >
          <Text>Go back</Text>
        </Button>
      </View>
    );
  }

  if (data === null) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error="Error fetching the alert details" />
        <Button
          className="w-24 absolute bottom-24 border self-center border-cyan-500 "
          onPress={() => navigation.goBack()}
        >
          <Text>Go back</Text>
        </Button>
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error="Sorry, error fetching data" />
        <Button
          className="w-24 absolute bottom-24 border self-center border-cyan-500 "
          onPress={() => navigation.goBack()}
        >
          <Text>Go back</Text>
        </Button>
      </View>
    );
  }

  async function copyToClipboard() {
    await Clipboard.setStringAsync(`${data?.Latitude}, ${data?.Longitude}`);
    setShowToast(true);
    const timerId = setTimeout(() => {
      setShowToast(false);
    }, 1200);
    return () => clearTimeout(timerId);
  }

  const sentAt = Number(data?.Timestamp);
  const date = new Date(sentAt);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedTimestamp = `${date.getMonth() + 1}/${date.getDate()}, ${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${amPm}`;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/desertbglt.png")}
        style={{
          height: screenHeight,
          width: screenWidth,
          margin: 0,
          padding: 0,
        }}
      >
        <View style={styles.background}>
          <AnimatedGradient />
        </View>
        <View style={styles.imagescontainer}>
          <ScrollView horizontal={true}>
            {data?.Photo &&
              data.Photo.map((photoObj: { id: number; url: string }) => (
                <Pressable style={styles.imagePressable} key={photoObj.id} onPress={() => openImageModal(photoObj.url)}>
                  <Image source={{ uri: photoObj.url }} style={styles.images} />
                </Pressable>
              ))}
          </ScrollView>
        </View>
        <View style={styles.box}>
          <ScrollView>
            {data?.ShareContact === "true" ? (
              <Text className=" text-center mt-2 font-semibold text-xl">Alert Sent by {data?.FullName}</Text>
            ) : (
              <Text className=" text-center mt-2 font-semibold text-xl">Sent Anonymously</Text>
            )}
            <Text className="mt-2 text-center font-light text-black text-lg">{formattedTimestamp}</Text>
            {data?.ShareContact === "true" && (
              <View className="flex flex-row justify-evenly">
                <Chip
                  className="mt-4 w-18 ml-2"
                  elevated={true}
                  mode="flat"
                  icon={() => <MaterialCommunityIcons name="email" size={18} color="#4AA8FF" />}
                  onPress={() => {
                    Linking.openURL(`mailto:${data?.Email}`);
                  }}
                >
                  Email
                </Chip>
              </View>
            )}
            <Pressable onPress={copyToClipboard}>
              <Text className="mt-4 text-center font-medium text-blue-400 text-lg">Copy Coordinates</Text>
            </Pressable>
            {showToast && (
              <View className="-mt-16 h-24 rounded-lg">
                <SuccessToast message="Coordinates Copied" />
              </View>
            )}
            <Text className="mt-8 ml-4 font-black text-black text-3xl">{data?.Animal}</Text>
            <Text className="mt-2 ml-4 font-semibold text-black  text-lg">Description: {data?.Description}</Text>
          </ScrollView>
        </View>
        {isConnected ? null : (
          <View className="flex-1 align-middle justify-end">
            <OfflineToast />
          </View>
        )}
      </ImageBackground>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isImageModalVisible}
        onRequestClose={closeImageModal} // This is for handling the hardware back button on Android.
      >
        <View style={styles.modalContainer}>
          <Pressable style={styles.modalCloseButton} onPress={closeImageModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
          {selectedImageUri && <Image source={{ uri: selectedImageUri }} style={styles.modalImage} />}
        </View>
      </Modal>
    </View>
  );
};

export default AlertDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    zIndex: -10,
  },
  box: {
    flex: 1,
    paddingHorizontal: 6,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 12,
    backgroundColor: "rgba(235, 238, 255, 0.79)",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight / 1.8,
  },
  imagescontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    padding: 10,
    backgroundColor: "rgba(235, 238, 255, 0.79)",
    borderRadius: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    maxHeight: screenHeight / 4,
  },
  imagePressable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  images: {
    width: 150,
    height: 190,
    borderRadius: 15,
    alignSelf: "center",
    marginHorizontal: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#000",
  },
  modalImage: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.7,
    resizeMode: "contain",
  },
});

/* 
  <Chip
                  className="mt-4 w-18 "
                  elevated={true}
                  mode="flat"
                  icon={() => <MaterialCommunityIcons name="phone" size={18} color="#4AA8FF" />}
                  onPress={() => {
                    Linking.openURL(`tel:${data?.PhoneNumber}`);
                  }}
                >
                  Call
                </Chip>
                <Chip
                  className="mt-4 w-18 ml-2"
                  elevated={true}
                  mode="flat"
                  icon={() => <MaterialCommunityIcons name="message" size={18} color="#4AA8FF" />}
                  onPress={() => {
                    Linking.openURL(`sms:${data?.PhoneNumber}`);
                  }}
                >
                  Text
                </Chip>

*/
