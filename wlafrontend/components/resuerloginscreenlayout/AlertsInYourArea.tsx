import React from "react";
import { View, Text } from "react-native";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getActiveInArea } from "../../api/index";
import { useConnectivity } from "../../hooks/useConnectivity";
import { useAuth } from "@clerk/clerk-expo";

type Props = {};

const AlertsInYourArea = (props: Props) => {
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
      <View className="h-24 w-64 mt-5 bg-[#00C5E021] items-center justify-center rounded-xl">
        <Text className="text-[#A6D4FF] text-lg">Fetching...</Text>
      </View>
    );
  }

  if (data?.error) {
    return (
      <View className="h-24 w-64 mt-5 bg-[#00C5E021] items-center justify-center rounded-xl">
        <Text className="text-[#A6D4FF] text-lg">{data?.error.message}</Text>
      </View>
    );
  }

  return (
    <View className="h-24 w-64 mt-5 bg-[#00C5E021] items-center rounded-xl">
      <Text className="text-[#A6D4FF] mt-1 text-5xl">{data?.alertCount}</Text>
      <Text className="text-[#A6D4FF] text-lg">Active Alerts</Text>
      <Text className="text-[#A6D4FF] font-light">In Your Area</Text>
    </View>
  );
};

export default AlertsInYourArea;
