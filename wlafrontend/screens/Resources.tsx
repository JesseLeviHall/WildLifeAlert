import * as React from "react";
import { ScrollView, View, RefreshControl, Text, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Appbar } from "react-native-paper";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getResources } from "../api/index";
import SpinnerComp from "../components/Spinner";
import OfflineToast from "../components/OfflineToast";
import { useConnectivity } from "../hooks/useConnectivity";
import { useRefreshByUser } from "../hooks/useRefreshByUser";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import ResourceCard from "../components/ResourceCard";
import ErrorMessage from "../components/ErrorMessage";

const screenHeight = Dimensions.get("window").height;

type RootStackParamList = {
  Home: undefined;
};
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;
type Props = {
  navigation: HomeScreenNavigationProp;
};
type Resource = {
  Icon: string;
  ResourceType: string;
  Title: string;
  Description: string;
  Image: string;
  Url: string;
  ButtonText: string;
};

const Resources = (props: Props) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const isConnected = useConnectivity();
  const { isLoading, refetch, data, error } = useQuery(
    ["resources"],
    async () => {
      try {
        return await getResources();
      } catch (error) {
        console.error("Error fetching resources:", error);
        return null;
      }
    },
    {
      enabled: isConnected,
    }
  );

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  if (isLoading || isRefetchingByUser) {
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
      </View>
    );
  }

  if (data === null) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error="Sorry! Error fetching the data. Swipe right to return." />
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error="Sorry, error fetching data" />
      </View>
    );
  }

  return (
    <LinearGradient style={{ height: screenHeight }} colors={["#6495ED70", "#71D1C74C", "#C6ED028C"]}>
      <Appbar.Header>
        <Appbar.Action
          icon="home"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
        <Appbar.Content title="Resources" />
      </Appbar.Header>
      <ScrollView refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}>
        <View className="mx-1 my-3 px-2">
          {isConnected ? null : (
            <View className="flex-1 align-middle justify-end">
              <OfflineToast />
            </View>
          )}
          {data?.map((resource: Resource, index: number) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Resources;
