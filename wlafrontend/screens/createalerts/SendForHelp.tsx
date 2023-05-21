import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, Button, VStack, FormControl, Input } from 'native-base';
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
	const [visible, setVisible] = React.useState(true);
	const [fullName, setFullName] = React.useState<{ fullName: string }>({
		fullName: '',
	});
	const [errors, setErrors] = React.useState<{ fullName: string }>({
		fullName: '',
	});
	const navigation = useNavigation<AlertDescriptionProp>();
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Basic Info',
			headerTintColor: '#000000',
			headerStyle: { backgroundColor: '#71D1C7' },
		});
	});

	const validate = () => {
		if (fullName?.fullName === '') {
			setErrors({ ...errors, fullName: 'Name is required' });
			console.log(errors);
			return false;
		} else if (fullName?.fullName.length < 3) {
			setErrors({ ...errors, fullName: 'Name should have at least 3 letters' });
			return false;
		}
		navigation.navigate('AlertDescription');
		return true;
	};

	const onSubmit = () => {
		validate() ? console.log('Submitted') : console.log('Validation Failed');
	};

	return (
		<LinearGradient
			style={{ height: screenHeight }}
			colors={['#0DE69A', '#71D1C7', '#99BBE3']}>
			{visible ? (
				<View className='h-full'>
					<AlertStartDialogue visible={visible} setVisible={setVisible} />
				</View>
			) : null}
			<Text className=' font-extrabold text-center m-24'>
				You Might Be Contacted warning should be at the end.
			</Text>
			<View className=' border-2 border-solid border-black flex-1 align-middle justify-center'>
				<FormControl isRequired>
					<FormControl.Label
						_text={{
							bold: true,
							color: 'black',
						}}>
						Full Name
					</FormControl.Label>
					<Input
						className=' bg-[#d4e1ea]'
						placeholder='First Last'
						onChangeText={(value) =>
							setFullName({ ...fullName, fullName: value })
						}
					/>
					{'fullName' in errors? <FormControl.HelperText
						_text={{
							fontSize: 'xs',
						}}>
						{errors.fullName}
					</FormControl.HelperText> : null
						}
					
				</FormControl>
			</View>
			<View className='flex-1 align-middle justify-center'>
				<Text className='text-center'>Send For Help 1 Start Screen</Text>
				<Button
					className=' w-24'
					onPress={onSubmit}>
					Next
				</Button>
			</View>
		</LinearGradient>
	);
};

export default SendForHelp;
