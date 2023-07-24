import React from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Provider, Text } from "react-native-paper";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const PushPermissionReg = ({ visible, setVisible }: Props) => {
  const experienceId = "@jesseye30/wildlifealert";
  const hideDialog = () => setVisible(false);

  const registerForPushNotificationsAsync = async () => {
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
      console.warn("Failed to get push token for push notification!");
      return;
    }

    // Get the token that identifies this device
    token = (await Notifications.getExpoPushTokenAsync({ experienceId })).data;

    // Save the token to AsyncStorage
    await AsyncStorage.setItem("expoPushToken", token);
    hideDialog();
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

/* 
in sdk 49+ change to this:
token = (await Notifications.getExpoPushTokenAsync({ projectId: 'wildlifealert-d6acb' })).data;

*/
