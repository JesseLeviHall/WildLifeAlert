import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Dimensions, Share } from "react-native";
import { useQuery } from "@tanstack/react-query/build/lib";
import { Appbar, FAB } from "react-native-paper";
import { useRefreshByUser } from "../hooks/useRefreshByUser";
import { useConnectivity } from "../hooks/useConnectivity";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import PubMapView, { PubMapViewHandle } from "../components/PubMapView";
import SpinnerComp from "../components/Spinner";
import OfflineToast from "../components/OfflineToast";
import { getPubData } from "../api/index";
import PubMapDialogue from "../components/PubMapInfoComp";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorMessage from "../components/ErrorMessage";

const BOTTOM_APPBAR_HEIGHT = 70;
const MEDIUM_FAB_HEIGHT = 46;
const screenHeight = Dimensions.get("window").height;

type RootStackParamList = {
  Home: undefined;
  RescuerLogin: undefined;
};
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;
type Props = {
  navigation: HomeScreenNavigationProp;
};
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

const PublicMap = (props: Props) => {
  const [infoVisible, setInfoVisible] = React.useState(false);
  const showInfoDialog = () => setInfoVisible(true);
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const isConnected = useConnectivity();

  const pubMapViewRef = React.useRef<PubMapViewHandle>(null);
  const handleMapTypeChange = () => {
    pubMapViewRef.current?.onMapTypeChange();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Download WildLifeAlert from this link: <dynamic link>",
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const {
    refetch,
    isLoading,
    data: alerts,
    error,
  } = useQuery<Alert[], Error>(["PubMapView"], () => getPubData(), {
    enabled: isConnected,
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  if (isLoading || isRefetchingByUser) {
    return (
      <View className="flex-1 align-middle justify-center">
        <SpinnerComp />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error={error.message} />
      </View>
    );
  }

  if (alerts === null) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error="Sorry! Error fetching data" />
      </View>
    );
  }

  if (!alerts) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error="Sorry, error fetching data" />
      </View>
    );
  }

  return (
    <LinearGradient style={{ height: screenHeight }} colors={["#0DE69A", "#71D1C7", "#99BBE3"]}>
      <Appbar.Header className="">
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Live Map" />
        <Appbar.Action icon="map" onPress={handleMapTypeChange} />
      </Appbar.Header>
      {infoVisible ? (
        <View style={{ height: screenHeight }}>
          <PubMapDialogue setInfoVisible={setInfoVisible} infoVisible={infoVisible} />
        </View>
      ) : null}
      <View className="flex-1 align-middle justify-center">
        <PubMapView ref={pubMapViewRef} alerts={alerts} />
      </View>
      {isConnected ? null : (
        <View className="flex-1 align-middle justify-end">
          <OfflineToast />
        </View>
      )}
      <Appbar
        style={[
          styles.bottom,
          {
            height: BOTTOM_APPBAR_HEIGHT + bottom,
            backgroundColor: "#bad1e8",
          },
        ]}
        safeAreaInsets={{ bottom }}
      >
        <Appbar.Action icon="refresh" onPress={() => refetchByUser()} />
        <Appbar.Action icon="share" onPress={onShare} />
        <FAB
          mode="flat"
          size="medium"
          icon="information"
          onPress={showInfoDialog}
          style={[styles.fab, { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 }]}
        />
      </Appbar>
    </LinearGradient>
  );
};

export default PublicMap;

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: "aquamarine",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: "absolute",
    right: 16,
  },
});
