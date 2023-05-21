import * as React from 'react';
import { ScrollView } from 'react-native';
import { Button, Dialog, Portal, Provider, Text } from 'react-native-paper';

type Props = {
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AlertStartDialogue = ({ visible, setVisible }: Props) => {
	const hideDialog = () => setVisible(false);
	return (
		<Provider>
			<Portal>
				<Dialog
					visible={visible}
					onDismiss={hideDialog}
					style={{ marginTop: -300 }}>
					<Dialog.Title>Safety Notice</Dialog.Title>
					<Dialog.ScrollArea>
						<ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}>
							<Text className='block'>
								Interacting with a wild animal carries risks both for yourself and the animal's well-being. Prior to handling, transporting, or disturbing a wild animal, we strongly advise exercising caution, using sound judgment, and seeking guidance from experts. 
							</Text>
              <Text className='block mt-4'>For additional information, please refer to our resources screen.</Text>
						</ScrollView>
					</Dialog.ScrollArea>
					<Dialog.Actions>
						<Button className=' text-center text-blue-800 ' onPress={hideDialog}>Continue</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</Provider>
	);
};

export default AlertStartDialogue;
