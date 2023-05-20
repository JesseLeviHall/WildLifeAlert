import React from 'react'
import { View, Text, Button } from 'native-base';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
	SetLocation: undefined;
};
type SetLocationProp = NavigationProp<RootStackParamList, 'SetLocation'>;
type Props = {
	navigation: SetLocationProp;
};

const AlertDescription = (props: Props) => {
  const navigation = useNavigation<SetLocationProp>();
  React.useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	});
  return (
    <View className='flex-1 align-middle justify-center'>
      <Text>Send For Help 2 Description Screen</Text>
      <Button onPress={() => navigation.navigate('SetLocation')}>Next</Button>
    </View>
  )
}

export default AlertDescription