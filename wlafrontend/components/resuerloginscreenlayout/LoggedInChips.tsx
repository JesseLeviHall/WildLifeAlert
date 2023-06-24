import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import SkeletonComp from "../../components/Skeleton";
import { Chip } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAuth } from "@clerk/clerk-expo";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

//TODO add delete account option

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
    return <SkeletonComp />;
  }

  return (
    <View style={styles.chips}>
      <Chip
        icon="account"
        onPress={() => navigation.navigate("RescuerPrefs")}
        elevated={true}
        mode="flat"
        selectedColor="#000626FF"
        showSelectedOverlay={true}
        className="h-10 w-32 mt-5 border-2 border-blue-50"
      >
        Preferences
      </Chip>
      <Chip
        icon="map-marker"
        onPress={() => navigation.navigate("PublicMap")}
        elevated={true}
        mode="flat"
        selectedColor="#000626FF"
        showSelectedOverlay={true}
        className="h-10 w-32 mt-5 border-2 border-blue-50"
      >
        To The Map
      </Chip>
      <Chip
        icon="home"
        onPress={() => {
          navigation.navigate("Home");
        }}
        elevated={true}
        mode="flat"
        selectedColor="#000626FF"
        showSelectedOverlay={true}
        className="h-10 w-32 mt-5 border-2 border-blue-50"
      >
        To Home
      </Chip>
      <Chip
        icon="logout"
        onPress={() => {
          signOut();
        }}
        elevated={true}
        mode="flat"
        selectedColor="#000626FF"
        showSelectedOverlay={true}
        className="h-10 w-32 mt-5 border-2 border-blue-50"
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
