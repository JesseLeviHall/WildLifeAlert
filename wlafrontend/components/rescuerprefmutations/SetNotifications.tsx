//Set notifications to true or false
import * as React from "react";
import { View } from "react-native";
import { Checkbox, Icon } from "native-base";
import * as Notifications from "expo-notifications";
import { useMutation } from "@tanstack/react-query/build/lib";
import { SetNotificationPref } from "../../api/index";
import { useAuth } from "@clerk/clerk-expo";
import SuccessToast from "../../components/SuccessToast";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useConnectivity } from "../../hooks/useConnectivity";

type Props = {
  notificationProp: string;
};

const SetNotifications = ({ notificationProp }: Props) => {
  const [error, setError] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);
  const [notifications, SetNotifications] = React.useState(notificationProp === "true");
  const { sessionId, getToken } = useAuth();
  const isConnected = useConnectivity();

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
    if (!isConnected) return;
    if (mutation.isLoading || mutation.error) return;
    try {
      setError("");
      const newNotificationValue = !notifications; // Flip the current notification state
      let expoPushToken = "";
      if (newNotificationValue) {
        let tokenObject = await Notifications.getExpoPushTokenAsync({ projectId: "wildlifealert-d6acb" });
        expoPushToken = tokenObject.data;
        console.log(expoPushToken);
      }
      SetNotifications(newNotificationValue); // Set the state to the new value
      const token = await getToken();
      if (sessionId && token !== null) {
        const NotificationsValue = newNotificationValue.toString();
        mutation.mutate({ sessionId, token, Notifications: NotificationsValue, expoPushToken });
      } else {
        throw new Error("Session ID, token, or user details is undefined");
      }
    } catch (err: any) {
      setError(err.errors[0].message);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="items-center w-full h-16 justify-center">
      <Checkbox
        value="green"
        colorScheme="green"
        size="lg"
        icon={<Icon as={<MaterialCommunityIcons name="alarm" />} />}
        isChecked={notifications}
        onChange={handleSubmitNotificationPref}
      >
        Notifications:{notifications ? "On" : "Off"}
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
