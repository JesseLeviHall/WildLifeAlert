import React from "react";
import { getPrivacyPolicyContent } from "../api/index";
import { Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query/build/lib";
import { useConnectivity } from "../hooks/useConnectivity";
import { useNavigation } from "@react-navigation/native";
import OfflineToast from "../components/OfflineToast";
import SkeletonComp from "../components/Skeleton";

type Props = {};

const AnotherScreen = (props: Props) => {
  const isConnected = useConnectivity();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Policies & Terms",
      headerTintColor: "#000000",
      headerStyle: { backgroundColor: "#71D1C7" },
    });
  });

  const { isLoading, data, error } = useQuery(
    ["privacyPolicy"],
    () => getPrivacyPolicyContent(),
    { enabled: isConnected }
  );

  if (isLoading) {
    return (
      <View className="flex-1 align-middle justify-center">
        <SkeletonComp />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 align-middle justify-center">
        <Text>{JSON.stringify(error)}</Text>;
      </View>
    );
  }

  return (
    <View className=" flex-1 align-middle justify-center">
      <Text className="text-lg">{data.Title}</Text>
      <Text className="text-lg">{data.Link}</Text>
      <Text className="text-lg">{data.Title2}</Text>
      <Text className="text-lg">{data.Link2}</Text>
      {isConnected ? null : (
        <View className="flex-1 align-middle justify-end">
          <OfflineToast />
        </View>
      )}
    </View>
  );
};

export default AnotherScreen;
