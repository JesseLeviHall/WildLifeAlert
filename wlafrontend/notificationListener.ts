import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function NotificationListener() {
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const alertId = response.notification.request.content.data.alertId;
      if (alertId) {
        // Use your navigation logic to navigate to the desired screen, e.g.,
        navigation.navigate("AlertDetails", { alertId: alertId });
      }
    });

    return () => subscription.remove();
  }, []);

  return null;
}
