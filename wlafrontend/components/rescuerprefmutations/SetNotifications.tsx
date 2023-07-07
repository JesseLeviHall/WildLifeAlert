//Set notifications to true or false
//set radius
import * as React from "react";
import {
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation } from "@tanstack/react-query/build/lib";
import { SetNotificationPref } from "../../api/index";
import { useAuth } from "@clerk/clerk-expo";
import OfflineToast from "../../components/OfflineToast";
import { useConnectivity } from "../../hooks/useConnectivity";
import SpinnerComp from "../../components/Spinner";
import SuccessToast from "../../components/SuccessToast";

type Props = {};

const SetNotifications = (props: Props) => {
  const [error, setError] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);
  const [Notifications, SetNotifications] = React.useState("");
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

  const mutation = useMutation(SetNotificationPref, {
    onSuccess: () => {
      // Show the toast when the mutation is successful
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1200);
    },
    onError: (error) => {
      console.error("Error: ", error);
    },
  });

  const handleSubmitNotificationPref = async () => {
    if (mutation.isLoading || mutation.error) return;
    try {
      setError("");
      Keyboard.dismiss();
      const token = await getToken();
      if (sessionId && token && Notifications) {
        mutation.mutate({ sessionId, token, Notifications });
      } else {
        throw new Error("Session ID, token, or user details is undefined");
      }
    } catch (err: any) {
      setError(err.errors[0].message);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View>
      <Text>Set Notifications</Text>
    </View>
  );
};

export default SetNotifications;
