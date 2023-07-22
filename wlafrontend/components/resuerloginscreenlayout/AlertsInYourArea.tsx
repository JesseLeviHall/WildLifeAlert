import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import WarnAnimatedGrad from "../background/WarnAnimatedGrad";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getActiveInArea } from "../../api/index";
import { useConnectivity } from "../../hooks/useConnectivity";
import { useAuth } from "@clerk/clerk-expo";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigationtypes";

type Props<T extends {} = RootStackParamList> = {
  navigation: NavigationProp<T>;
};

const AlertsInYourArea = <T extends RootStackParamList>({ navigation }: Props<T>) => {
  const isConnected = useConnectivity();
  const { sessionId, getToken } = useAuth();
  const [token, setToken] = React.useState<string | null>(null);

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
    ["activeinarea", sessionId, token],
    () => (sessionId && token ? getActiveInArea({ sessionId, token }) : null),
    {
      enabled: !!sessionId && isConnected,
    }
  );

  if (isLoading) {
    return (
      <View className="h-28 w-64 mt-5 bg-[#00C5E021] items-center align-middle justify-center rounded-xl">
        <Text className="text-[#A6D4FF] text-lg">Fetching...</Text>
      </View>
    );
  }

  if (data?.error) {
    return (
      <View
        className={`h-28 w-64 mt-5 bg-[#00C5E021] items-center align-middle justify-center rounded-xl ${
          data?.alertCount > 0 ? "border-2 border-red-500" : ""
        }`}
      >
        <Text className="text-[#A6D4FF] text-lg">{data?.error.message}</Text>
      </View>
    );
  }

  const handlePress = () => {
    if (data?.alertCount >= 1) {
      navigation.navigate("AlertDetails", { alertId: data?.alerts[0] });
    }
    return;
  };

  return (
    <View>
      <Pressable onPress={handlePress} disabled={data?.alertCount == 0}>
        <View
          className={`h-28 w-64 mt-5 bg-[#00C5E021] items-center align-middle justify-center rounded-xl ${
            data?.alertCount > 0 ? "border-2 border-red-500" : ""
          }`}
        >
          {data?.alertCount > 0 && <WarnAnimatedGrad />}
          <Text className="text-[#A6D4FF]  text-5xl">{data?.alertCount}</Text>
          <Text className="text-[#A6D4FF] text-lg">Recent Alerts</Text>
          <Text className="text-[#A6D4FF]  font-light">Last 48 Hours in your radius</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default AlertsInYourArea;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    zIndex: -10,
  },
});
