import React from "react";
import { View, Text, Pressable } from "react-native";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getActiveInArea } from "../../api/index";
import { useConnectivity } from "../../hooks/useConnectivity";
import { useAuth } from "@clerk/clerk-expo";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  AlertDetails: { alertId: string };
};
type AlertDetailsNavigationProp = NavigationProp<RootStackParamList, "AlertDetails">;

type Props = {
  navigation: AlertDetailsNavigationProp;
};

const AlertsInYourArea = (props: Props) => {
  const isConnected = useConnectivity();
  const { sessionId, getToken } = useAuth();
  const [token, setToken] = React.useState<string | null>(null);
  const navigation = useNavigation<AlertDetailsNavigationProp>();

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
    <Pressable onPress={handlePress} disabled={data?.alertCount == 0}>
      <View
        className={`h-28 w-64 mt-5 bg-[#00C5E021] items-center align-middle justify-center rounded-xl ${
          data?.alertCount > 0 ? "border-2 border-red-500" : ""
        }`}
      >
        <Text className="text-[#A6D4FF]  text-5xl">{data?.alertCount}</Text>
        <Text className="text-[#A6D4FF] text-lg">Recent Alerts</Text>
        <Text className="text-[#A6D4FF]  font-light">Last 48 Hours in your radius</Text>
      </View>
    </Pressable>
  );
};

export default AlertsInYourArea;
