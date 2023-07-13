import React from "react";
import { View, Text } from "react-native";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getTotalAlerts } from "../../api/index";
import { useConnectivity } from "../../hooks/useConnectivity";
import { useAuth } from "@clerk/clerk-expo";

type Props = {};

const ActiveGlobal = (props: Props) => {
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
    ["activetotal", sessionId, token],
    () => (sessionId && token ? getTotalAlerts({ sessionId, token }) : null),
    {
      enabled: !!sessionId && isConnected,
    }
  );

  if (isLoading) {
    return (
      <View className="h-28 w-64 mt-5 bg-[#00C5E021] items-center justify-center rounded-xl">
        <Text className="text-[#A6D4FF] text-lg">Fetching...</Text>
      </View>
    );
  }

  if (data?.error) {
    return (
      <View className="h-28 w-64 mt-5 bg-[#00C5E021] items-center justify-center rounded-xl">
        <Text className="text-[#A6D4FF] text-lg">{data?.error.message}</Text>
      </View>
    );
  }

  return (
    <View className="h-28 w-64 mt-5 bg-[#00C5E021] justify-center items-center rounded-xl">
      <Text className="text-[#A6D4FF] text-5xl">{data?.alertCount}</Text>
      <Text className="text-[#A6D4FF] text-base">Global Alerts</Text>
      <Text className="text-[#A6D4FF] font-light">All Time</Text>
    </View>
  );
};

export default ActiveGlobal;
