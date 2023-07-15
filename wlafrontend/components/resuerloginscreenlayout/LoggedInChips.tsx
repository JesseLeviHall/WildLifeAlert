import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Chip } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAuth } from "@clerk/clerk-expo";
import SpinnerComp from "../../components/Spinner";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type RootStackParamList = {
  RescuerRegister: undefined;
  PublicMap: undefined;
  Home: undefined;
  RescuerPrefs: undefined;
  ForgotPassword: undefined;
};
type RescuerRegisterNavigationProp = NavigationProp<RootStackParamList, "RescuerRegister">;

type Props = {
  navigation: RescuerRegisterNavigationProp;
};

const LoggedInChips = (props: Props) => {
  const navigation = useNavigation<RescuerRegisterNavigationProp>();

  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return <SpinnerComp />;
  }

  return (
    <View style={styles.chips}>
      <Chip
        icon={() => <MaterialCommunityIcons name="account" size={18} color="#A6D4FF" />}
        accessibilityLabel="Navigate to Preferences"
        onPress={() => navigation.navigate("RescuerPrefs")}
        elevated={false}
        mode="flat"
        selectedColor="#000626FF"
        showSelectedOverlay={true}
        textStyle={{ color: "#A6D4FF" }}
        className="h-12 w-32 mt-5 bg-[#00C5E021]"
      >
        Preferences
      </Chip>
      <Chip
        icon={() => <MaterialCommunityIcons name="map" size={18} color="#A6D4FF" />}
        accessibilityLabel="Navigate to Map"
        onPress={() => navigation.navigate("PublicMap")}
        elevated={false}
        mode="flat"
        selectedColor="#000626FF"
        showSelectedOverlay={true}
        textStyle={{ color: "#A6D4FF" }}
        className="h-12 w-32 mt-5 bg-[#00C5E021]"
      >
        To The Map
      </Chip>
      <Chip
        icon={() => <MaterialCommunityIcons name="home" size={18} color="#A6D4FF" />}
        accessibilityLabel="Navigate to Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
        elevated={false}
        mode="flat"
        selectedColor="#000626FF"
        showSelectedOverlay={true}
        textStyle={{ color: "#A6D4FF" }}
        className="h-12 w-32 mt-5 bg-[#00C5E021]"
      >
        To Home
      </Chip>
      <Chip
        icon={() => <MaterialCommunityIcons name="logout" size={18} color="#A6D4FF" />}
        accessibilityLabel="Sign Out"
        onPress={() => {
          signOut();
        }}
        elevated={false}
        mode="flat"
        selectedColor="#000626FF"
        showSelectedOverlay={true}
        textStyle={{ color: "#A6D4FF" }}
        className="h-12 w-32 mt-5 bg-[#00C5E021]"
      >
        Sign Out
      </Chip>
    </View>
  );
};

export default LoggedInChips;

const styles = StyleSheet.create({
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: screenWidth / 1.5,
    alignSelf: "center",
    marginTop: 1,
    zIndex: 10,
  },
});
