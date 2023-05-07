import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Dialog, Portal, Provider, Text } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query/build/lib';
import { getPubMapDialogueContent } from '../api/index';

type Props = {
	infoVisible: boolean;
	setInfoVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const PubMapDialogue = ({ setInfoVisible, infoVisible }: Props) => {
	const hideDialog = () => setInfoVisible(false);

	const { data, error, refetch } = useQuery({
		queryKey: ['PubMapDialogue'],
		queryFn: () => getPubMapDialogueContent(),
		enabled: false, // Initially disabled, will be enabled when the dialog opens
	});

	React.useEffect(() => {
		if (infoVisible) {
			refetch(); // Fetch the data when the dialog becomes visible
		}
	}, [infoVisible, refetch]);

	if (error) {
		console.log(error);
		return <Text>{JSON.stringify(error)}</Text>;
	}

	return (
		<Provider>
			<Portal>
				<Dialog visible={infoVisible} onDismiss={hideDialog}>
					<Dialog.Title>{data?.Title}</Dialog.Title>
					<Dialog.ScrollArea>
						<ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
							<Text className='block'>
								{data?.Description}
								{'\n\n'}
								{data?.Message}
							</Text>
						</ScrollView>
					</Dialog.ScrollArea>
					<Dialog.Actions>
						<Button onPress={hideDialog}>Done</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</Provider>
	);
};

export default PubMapDialogue;
