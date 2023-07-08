//Set notifications to true or false
import * as React from "react";
import { Text, View } from "react-native";
import { Checkbox, Icon } from "native-base";
import { useMutation } from "@tanstack/react-query/build/lib";
import { SetNotificationPref } from "../../api/index";
import { useAuth } from "@clerk/clerk-expo";
import SuccessToast from "../../components/SuccessToast";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  notificationProp: boolean;
};

const SetNotifications = ({ notificationProp }: Props) => {
  const [error, setError] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);
  const [notifications, SetNotifications] = React.useState(notificationProp);
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
      const newNotificationValue = !notifications; // Flip the current notification state
      SetNotifications(newNotificationValue); // Set the state to the new value
      const token = await getToken();
      if (sessionId && token !== null) {
        const Notifications = newNotificationValue.toString();
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
    <View className="h-14">
      <Checkbox
        value="orange"
        colorScheme="orange"
        size="lg"
        icon={<Icon as={<MaterialCommunityIcons name="alarm" />} />}
        isChecked={notifications}
        onChange={handleSubmitNotificationPref}
      >
        Notifications {notifications ? "On" : "Off"}
      </Checkbox>
      {showToast && (
        <View className="-mt-16 h-16 rounded-lg">
          <SuccessToast message="Notifications Set" />
        </View>
      )}
    </View>
  );
};

export default SetNotifications;
