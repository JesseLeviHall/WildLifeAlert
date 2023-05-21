import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, Button } from 'native-base';

type RootStackParamList = {
	SetLocation: undefined;
};
type SetLocationProp = NavigationProp<RootStackParamList, 'SetLocation'>;
type Props = {
	navigation: SetLocationProp;
};
const screenHeight = Dimensions.get('window').height;
const AlertDescription = (props: Props) => {
  const navigation = useNavigation<SetLocationProp>();
  React.useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Description',
			 headerTintColor: '#000000', 
      headerStyle: { backgroundColor: '#71D1C7' },
		});
	});
  return (
    <LinearGradient
			style={{ height: screenHeight }}
			colors={['#0DE69A', '#71D1C7', '#99BBE3']}>
    <View className='flex-1 align-middle justify-center'>
      <Text>Send For Help 2 Description Screen</Text>
      <Button onPress={() => navigation.navigate('SetLocation')}>Next</Button>
    </View>
    </LinearGradient>
  )
}

export default AlertDescription