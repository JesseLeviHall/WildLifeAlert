import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, Icon, Button, FormControl, Input, } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import AlertStartDialogue from '../../components/AlertStartDialogue';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
type Errors = {
	fullName: string;
	Email: string;
	PhoneNumber: string;
};
const screenHeight = Dimensions.get('window').height;

const SendForHelp = (props: Props) => {
	const [visible, setVisible] = React.useState(true);
	const [fullName, setFullName] = React.useState<{ fullName: string }>({
		fullName: '',
	});
	const [errors, setErrors] = React.useState<Errors>({
		fullName: '',
		Email: '',
		PhoneNumber: '',
	});
	const [Email, setEmail] = React.useState<{ Email: string }>({
		Email: '',
	});
	const [PhoneNumber, setPhoneNumber] = React.useState<{
		PhoneNumber: string;
	}>({
		PhoneNumber: '',
	});

	const navigation = useNavigation<AlertDescriptionProp>();
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Basic Info',
			headerTintColor: '#000000',
			headerStyle: { backgroundColor: '#71D1C7' },
		});
	});

	const validate = async () => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phonePattern = /^[2-9]{1}[0-9]{2}-[0-9]{3}-[0-9]{4}$/;

		let updatedErrors = {
			fullName: '',
			Email: '',
			PhoneNumber: '',
		};

		if (fullName.fullName === '') {
			updatedErrors.fullName = 'Name is required';
		} else if (fullName.fullName.length < 3) {
			updatedErrors.fullName = 'Name should have at least 3 letters';
		}

		if (Email.Email === '') {
			updatedErrors.Email = 'Email is required';
		} else if (!emailPattern.test(Email.Email)) {
			updatedErrors.Email = 'Please enter a valid Email';
		}

		if (PhoneNumber.PhoneNumber === '') {
			updatedErrors.PhoneNumber = 'Phone Number is required';
		} else if (!phonePattern.test(PhoneNumber.PhoneNumber)) {
			updatedErrors.PhoneNumber = 'for phone number, use format: xxx-xxx-xxxx';
		}

		setErrors(updatedErrors);

		if (
			updatedErrors.fullName === '' &&
			updatedErrors.Email === '' &&
			updatedErrors.PhoneNumber === ''
		) {
			try {
				await AsyncStorage.setItem('fullName', `${fullName}`);
				await AsyncStorage.setItem('Email', `${Email}`);
				await AsyncStorage.setItem('PhoneNumber', `${PhoneNumber}`);
				console.log('Data saved');
			} catch (error) {
				// handle error
				console.log('Error saving data', error);
			}
			return true;
		} else {
			return false;
		}
	};

	const onSubmit = async () => {
		const isValid = await validate();
		if (isValid) {
			navigation.navigate('AlertDescription');
		} else {
			console.log('Validation Failed');
		}
	};

	return (
		 <LinearGradient
			style={{ height: screenHeight }}
			colors={['#0DE69A', '#71D1C7', '#99BBE3']}>
			<View>
				{visible ? (
					<View className='h-full'>
						<AlertStartDialogue visible={visible} setVisible={setVisible} />
					</View>
				) : null}
			</View>
			 <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View className='flex flex-1 items-center p-4 h-full w-full '>
						<Text className='text-center font-black uppercase text-4xl'>who is posting?</Text>
					<View className='mt-8 w-10/12 items-center p-6 bg-[#99bbe36e] rounded-lg border border-spacing-10 border-[#293b27fe]'>			
						<FormControl isRequired className='mb-4'>
							<FormControl.Label
								_text={{
									bold: true,
									color: 'black',
								}}>
								Full Name
							</FormControl.Label>
							<Input
								className=' bg-[#d4e1ea] w-2/3'
								placeholder='First & Last'
								variant="filled"
								autoComplete="name"
								onChangeText={(value) =>
									setFullName({ ...fullName, fullName: value })
								}
							/>
							{'fullName' in errors ? (
								<FormControl.HelperText
									_text={{
										fontSize: 'xs',
									}}>
									{errors.fullName}
								</FormControl.HelperText>
							) : null}
						</FormControl>
						<FormControl isRequired className='m-4'>
							<FormControl.Label
								_text={{
									bold: true,
									color: 'black',
								}}>
								Email
							</FormControl.Label>
							<Input
								className=' bg-[#d4e1ea]'
								placeholder='Email Address'
								keyboardType='email-address'
								autoComplete="email"
								variant="filled"
								onChangeText={(value) => setEmail({ ...Email, Email: value })}
							/>
							{'Email' in errors ? (
								<FormControl.HelperText
									_text={{
										fontSize: 'xs',
									}}>
									{errors.Email}
								</FormControl.HelperText>
							) : null}
						</FormControl>
						<FormControl isRequired className='m-4'>
							<FormControl.Label
								_text={{
									bold: true,
									color: 'black',
								}}>
								Phone
							</FormControl.Label>
							<Input
								className=' bg-[#d4e1ea]'
								placeholder='Phone Number'
								variant="filled"
								autoComplete="tel"
								keyboardType='phone-pad'
								onChangeText={(value) =>
									setPhoneNumber({ ...PhoneNumber, PhoneNumber: value })
								}
							/>
							{'PhoneNumber' in errors ? (
								<FormControl.HelperText
									_text={{
										fontSize: 'xs',
									}}>
									{errors.PhoneNumber}
								</FormControl.HelperText>
							) : null}
						</FormControl>
					<Button className=' mt-6 w-24' onPress={onSubmit}>
						Next
					</Button>		
					</View>
			</View>
			</TouchableWithoutFeedback>
		</LinearGradient>
	);
};

export default SendForHelp;
