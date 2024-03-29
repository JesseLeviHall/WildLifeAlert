import React from "react";
import { View, Platform } from "react-native";
import { Button, Dialog, Portal, Provider, Text } from "react-native-paper";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const PushPermissionReg = ({ visible, setVisible }: Props) => {
  const hideDialog = () => setVisible(false);

  const registerForPushNotificationsAsync = async () => {
    try {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX, // you can choose another level of importance
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      let token;
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Only ask if permissions have not been determined because
      // on iOS, asking the user a second time will fail, and they need to manually enable it in settings
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      // Stop here if the user did not grant permissions
      if (finalStatus !== "granted") {
        console.warn("Notifications not granted");
        return;
      }

      // Get the token that identifies this device
      token = (await Notifications.getExpoPushTokenAsync({ projectId: "17a356f2-ec4c-4d59-920f-b77650d9ba44" })).data;

      // Save the token to AsyncStorage
      await AsyncStorage.setItem("expoPushToken", token);
      hideDialog();
    } catch (error) {
      console.warn("Error while setting up notifications:", error);
    }
  };

  return (
    <Provider>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ marginTop: -300 }}>
          <Dialog.Title>Push Notifications</Dialog.Title>
          <Dialog.ScrollArea>
            <View style={{ paddingHorizontal: 24, paddingVertical: 12 }}>
              <Text className="block">
                In order to be notified of alerts in your area, please allow notifications. This can be changed later in
                preferences.
              </Text>
            </View>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button className=" text-center text-blue-800 " onPress={registerForPushNotificationsAsync}>
              Accept Notifications
            </Button>
            <Button className=" text-center text-blue-800 " onPress={hideDialog}>
              Decline
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default PushPermissionReg;
