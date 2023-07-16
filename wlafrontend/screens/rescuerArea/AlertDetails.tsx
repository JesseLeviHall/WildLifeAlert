import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getAlertDetails } from "../../api/index";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";
import SpinnerComp from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";

type StackParams = {
  AlertDetails: { alertId: string };
};

type AlertDetailsScreenRouteProp = RouteProp<StackParams, "AlertDetails">;
type AlertDetailsNavigationProp = NativeStackNavigationProp<StackParams, "AlertDetails">;

type Props = {
  route: AlertDetailsScreenRouteProp;
  navigation: AlertDetailsNavigationProp;
};

const AlertDetails: React.FC<Props> = ({ route, navigation }) => {
  const { sessionId, getToken } = useAuth();
  const isConnected = useConnectivity();
  const [token, setToken] = React.useState<string | null>(null);
  const { alertId } = route.params;

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
    ["alertdetails", sessionId, token, alertId],
    async () => {
      try {
        if (sessionId && token) {
          return await getAlertDetails({ sessionId, token, alertId });
        } else {
          throw new Error("SessionId or token is missing");
        }
      } catch (error) {
        console.error("Error fetching alert details:", error);
        return null;
      }
    },
    {
      enabled: !!sessionId && !!token && isConnected,
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
        <ErrorMessage error={data?.error.message} />
      </View>
    );
  }

  if (data === null) {
    return (
      <View className="flex-1 align-middle justify-center">
        <ErrorMessage error="Error fetching the alert details" />
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
    <View>
      <Text>AlertDetails: {alertId}</Text>
      <Text>DetailsResponse: {data?.FullName}</Text>
    </View>
  );
};

export default AlertDetails;
