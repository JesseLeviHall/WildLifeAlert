import React from 'react';
import { HStack, Spinner } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';

type Props = {};

const SpinnerComp = (props: Props) => {
	const screenHeight = Dimensions.get('window').height;
	return (
		<LinearGradient
			style={{ height: screenHeight }}
			colors={['#0DE69A', '#71D1C7', '#99BBE3']}>
			<HStack space={2} alignItems='center'>
				<Spinner accessibilityLabel='Loading' size='lg' />
			</HStack>
		</LinearGradient>
	);
};

export default SpinnerComp;
