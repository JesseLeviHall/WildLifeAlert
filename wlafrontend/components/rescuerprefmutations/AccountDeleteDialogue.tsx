import * as React from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Provider, Text } from "react-native-paper";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccountDeleteDialogue = ({ visible, setVisible }: Props) => {
  const handleDelete = () => {
    console.log("Delete Account");
    setVisible(false);
  };

  return (
    <Provider>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Delete Account</Dialog.Title>
          <Text className="block mt-4 px-6">
            Are you sure? All of your information will be permanently deleted
            like you were never here.
          </Text>
          <View className="flex-row col-span-1 mt-12 self-start">
            <Dialog.Actions>
              <Button onPress={handleDelete}>Delete</Button>
            </Dialog.Actions>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Cancel</Button>
            </Dialog.Actions>
          </View>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default AccountDeleteDialogue;
