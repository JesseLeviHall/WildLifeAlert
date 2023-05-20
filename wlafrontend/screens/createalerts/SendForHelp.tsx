import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, Button } from 'native-base';
import AlertStartDialogue from '../../components/AlertStartDialogue';

type RootStackParamList = {
	AlertDescription: undefined;
};
type AlertDescriptionProp = NavigationProp<
	RootStackParamList,
	'AlertDescription'
>;
type Props = {
	navigation: AlertDescriptionProp;
};
const screenHeight = Dimensions.get('window').height;

const SendForHelp = (props: Props) => {
	const [visible, setVisible] = useState(true);
	const navigation = useNavigation<AlertDescriptionProp>();
React.useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Basic Info',
		});
	});
	return (
		<LinearGradient
			style={{ height: screenHeight }}
			colors={['#0DE69A', '#71D1C7', '#99BBE3']}>
			{visible ? (
				<View className='h-full'>
					<AlertStartDialogue visible={visible} setVisible={setVisible} />
				</View>
			) : null}
<Text className=' font-extrabold z-10 text-center m-24'>
            You Might Be Contacted warning should be at the end. 
          </Text>
			<View className='flex-1 align-middle justify-center'>
				<Text>Send For Help 1 Start Screen</Text>
				<Button className='w-24' onPress={() => navigation.navigate('AlertDescription')}>
					Next
				</Button>
			</View>
		</LinearGradient>
	);
};

export default SendForHelp;
