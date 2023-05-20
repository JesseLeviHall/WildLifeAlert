import React from 'react'
import { View, Text, Button } from 'native-base';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
	ConfirmPost: undefined;
};
type ConfirmPostProp = NavigationProp<RootStackParamList, 'ConfirmPost'>;
type Props = {
	navigation: ConfirmPostProp;
};


const AddPhotos = (props: Props) => {
  const navigation = useNavigation<ConfirmPostProp>();
  React.useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	});
  return (
    <View className='flex-1 align-middle justify-center'>
      <Text>Send For Help 4 Photos Screen</Text>
      <Button onPress={() => navigation.navigate('ConfirmPost')}>Next</Button>
    </View>
  )
}

export default AddPhotos