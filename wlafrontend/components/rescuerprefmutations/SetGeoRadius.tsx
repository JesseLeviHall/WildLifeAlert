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
import { setGeoRadius } from "../../api/index";
import { useAuth } from "@clerk/clerk-expo";

import SpinnerComp from "../../components/Spinner";
import SuccessToast from "../../components/SuccessToast";

type Props = {
  geoRadius: string;
};

const SetGeoRadius = (props: Props) => {
  const [error, setError] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);
  const [Radius, setRadius] = React.useState("");
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

  const mutation = useMutation(setGeoRadius, {
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

  const handleSubmitGeoPref = async () => {
    if (mutation.isLoading || mutation.error) return;
    try {
      setError("");
      Keyboard.dismiss();
      const token = await getToken();
      if (sessionId && token && Radius) {
        mutation.mutate({ sessionId, token, Radius });
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
      <Text>Radius is: {props.geoRadius} miles</Text>
      {showToast && (
        <View className="-mt-16 h-16 rounded-lg">
          <SuccessToast message="Radius Set" />
        </View>
      )}
    </View>
  );
};

export default SetGeoRadius;
