import * as React from "react";
import { Text, View } from "react-native";
import OfflineToast from "../../components/OfflineToast";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getRescuerPrefs } from "../../api/index";
import { useConnectivity } from "../../hooks/useConnectivity";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import SpinnerComp from "../../components/Spinner";

type Props = {};

const RescuerPrefs = (props: Props) => {
  const isConnected = useConnectivity();
  const { sessionId, getToken } = useAuth();
  const [token, setToken] = React.useState<string | null>(null);
  React.useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      if (fetchedToken) {
        setToken(fetchedToken);
        console.log(sessionId, fetchedToken);
      }
    };
    fetchToken();
  }, []);

  const { isLoading, data, error } = useQuery(
    ["rescuerprefs", sessionId, token],
    () => (sessionId && token ? getRescuerPrefs(sessionId, token) : null),
    {
      enabled: !!sessionId && isConnected,
    }
  );

  if (isLoading) {
    return (
      <View className="flex-1 align-middle justify-center">
        <SpinnerComp />
      </View>
    );
  }

  if (data?.error) {
    return (
      <View className="flex-1 align-middle justify-center">
        <Text>{data?.error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{data?.Title}</Text>
      {isConnected ? null : (
        <View className="flex-1 align-middle justify-end">
          <OfflineToast />
        </View>
      )}
    </View>
  );
};

export default RescuerPrefs;
