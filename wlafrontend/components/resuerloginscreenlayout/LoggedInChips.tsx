import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Chip } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAuth } from "@clerk/clerk-expo";
import SpinnerComp from "../../components/Spinner";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type RootStackParamList = {
  RescuerRegister: undefined;
  PublicMap: undefined;
  Home: undefined;
  RescuerPrefs: undefined;
  ForgotPassword: undefined;
};
type RescuerRegisterNavigationProp = NavigationProp<
  RootStackParamList,
  "RescuerRegister"
>;

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
        icon="account"
        accessibilityLabel="Navigate to Preferences"
        onPress={() => navigation.navigate("RescuerPrefs")}
        elevated={true}
        mode="flat"
        selectedColor="#000626FF"
        showSelectedOverlay={true}
        className="h-10 w-32 mt-5 bg-[#00C5E021]"
      >
        Preferences
      </Chip>
      <Chip
        icon="map"
        accessibilityLabel="Navigate to Map"
        onPress={() => navigation.navigate("PublicMap")}
        elevated={true}
        mode="flat"
        selectedColor="#000626FF"
        showSelectedOverlay={true}
        className="h-10 w-32 mt-5 bg-[#00C5E021]"
      >
        To The Map
      </Chip>
      <Chip
        icon="home"
        accessibilityLabel="Navigate to Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
        elevated={true}
        mode="flat"
        selectedColor="#000626FF"
        showSelectedOverlay={true}
        className="h-10 w-32 mt-5 bg-[#00C5E021]"
      >
        To Home
      </Chip>
      <Chip
        icon="logout"
        accessibilityLabel="Sign Out"
        onPress={() => {
          signOut();
        }}
        elevated={true}
        mode="flat"
        selectedColor="#000626FF"
        showSelectedOverlay={true}
        textStyle={{ color: "#000626FF" }}
        className="h-10 w-32 mt-5 bg-[#00C5E021]"
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
    marginTop: 50,
    zIndex: 10,
  },
});
