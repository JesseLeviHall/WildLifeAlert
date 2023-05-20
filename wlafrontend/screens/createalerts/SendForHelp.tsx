import React from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, Button } from 'native-base';

type RootStackParamList = {
	AlertDescription: undefined;
};
type AlertDescriptionProp = NavigationProp<RootStackParamList, 'AlertDescription'>;
type Props = {
	navigation: AlertDescriptionProp;
};


const SendForHelp = (props: Props) => {
  const navigation = useNavigation<AlertDescriptionProp>();
  React.useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	});
  return (
    <View className='flex-1 align-middle justify-center'>
      <Text>Send For Help 1 Start Screen</Text>
      <Button onPress={() => navigation.navigate('AlertDescription')}>Next</Button>
    </View>
  )
}

export default SendForHelp