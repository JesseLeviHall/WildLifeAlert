import * as React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Provider, Text } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query/build/lib';

type Props = {
  infoVisible: boolean;
  setInfoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}


const PubMapDialogue = ({setInfoVisible, infoVisible}: Props ) => {
  
  
  const hideDialog = () => setInfoVisible(false);

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog visible={infoVisible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">This is simple dialog</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default PubMapDialogue;