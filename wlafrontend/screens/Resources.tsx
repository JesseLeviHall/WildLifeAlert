import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { Link, Text, VStack, Image } from 'native-base';

const screenHeight = Dimensions.get('window').height;

type Props = {};

const Resources = (props: Props) => {
	return (
		<LinearGradient
			style={{ height: screenHeight }}
			colors={['#0DE69A', '#71D1C7', '#99BBE3']}>
			<VStack space={2} justifyContent='center' alignItems='center' safeAreaTop>
				<Image
					width={40}
					height={20}
					resizeMode='cover'
					source={{
						uri: 'https://ahnow.org/images/weblink_small.png',
					}}
					alt='animal help now.org'
				/>
				<Link href='https://ahnow.org' isExternal>
					<Text>Visit </Text>
					<Text className=' text-blue-500'>AnimalHelpNow.org </Text>
				</Link>
				<Text className='mx-16'>
					to locate wildlife rescue organizations near you
				</Text>
			</VStack>
		</LinearGradient>
	);
};

export default Resources;
