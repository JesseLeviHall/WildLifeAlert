import React from 'react';
import { View } from 'react-native';
import { TouchableRipple, Surface } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Box, HStack } from 'native-base';

type RootStackParamList = {
	Home: undefined;
	PublicMap: undefined;
	SendForHelp: undefined;
	About: undefined;
	RescuerLogin: undefined;
	Resources: undefined;
};
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;
type Props = {
	navigation: HomeScreenNavigationProp;
};

const HomeNavBot = (props: Props) => {
	const navigation = useNavigation<HomeScreenNavigationProp>();
	return (
    <Surface elevation={4}>
		<HStack
			space={3}
			borderWidth='1'
			borderColor='coolGray.300'
			justifyContent='center'
			bg='#33fff2'>
			<TouchableRipple
				borderless={true}
				rippleColor='#f8b935'
				onPress={() => navigation.navigate('RescuerLogin')}>
				<Box
					p='2'
					alignItems='center'
					_text={{
						fontSize: 'md',
						fontWeight: 'medium',
						letterSpacing: 'lg',
					}}>
					<MaterialCommunityIcons name='launch' size={28} />
					{'Rescuers'}
				</Box>
			</TouchableRipple>

			<TouchableRipple
				borderless={true}
				rippleColor='#f8b935'
				onPress={() => navigation.navigate('PublicMap')}>
				<Box
					p='2'
					alignItems='center'
					_text={{
						fontSize: 'md',
						fontWeight: 'medium',
						letterSpacing: 'lg',
					}}>
					<MaterialCommunityIcons name='latitude' size={28} />
					{'Live Map'}
				</Box>
			</TouchableRipple>

			<TouchableRipple
				borderless={true}
				rippleColor='#f8b935'
				onPress={() => navigation.navigate('Resources')}>
				<Box
					p='2'
					alignItems='center'
					_text={{
						fontSize: 'md',
						fontWeight: 'medium',
						letterSpacing: 'lg',
					}}>
					<MaterialCommunityIcons name='magnify-expand' size={28} />
					{'Resources'}{' '}
				</Box>
			</TouchableRipple>

			<TouchableRipple
				borderless={true}
				rippleColor='#f8b935'
				onPress={() => navigation.navigate('About')}>
				<Box
					p='2'
					alignItems='center'
					_text={{
						fontSize: 'md',
						fontWeight: 'medium',
						letterSpacing: 'lg',
					}}>
					<MaterialCommunityIcons name='lightbulb-on' size={28} />
					{'About'}{' '}
				</Box>
			</TouchableRipple>
		</HStack>
    </Surface>
	);
};

export default HomeNavBot;
