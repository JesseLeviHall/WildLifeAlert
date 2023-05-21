import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, Button } from 'native-base';
type RootStackParamList = {
	NextSteps: undefined;
};
type NextStepsProp = NavigationProp<RootStackParamList, 'NextSteps'>;
type Props = {
	navigation: NextStepsProp;
};
const screenHeight = Dimensions.get('window').height;

const ConfirmPost = (props: Props) => {
  const navigation = useNavigation<NextStepsProp>();
  React.useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Confirm',
			 headerTintColor: '#000000', 
      headerStyle: { backgroundColor: '#71D1C7' },
		});
	});
  return (
    <LinearGradient
			style={{ height: screenHeight }}
			colors={['#0DE69A', '#71D1C7', '#99BBE3']}>
    <View className='flex-1 align-middle justify-center'>
      <Text>Send For Help 5 Comfirmation Screen</Text>
      <Button onPress={() => navigation.navigate('NextSteps')}>Next</Button>
    </View>
    </LinearGradient>
  )
}

export default ConfirmPost