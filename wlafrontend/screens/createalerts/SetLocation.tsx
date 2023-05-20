import React from 'react'
import { View, Text, Button } from 'native-base';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
	AddPhotos: undefined;
};
type AddPhotosProp = NavigationProp<RootStackParamList, 'AddPhotos'>;
type Props = {
	navigation: AddPhotosProp;
};

const SetLocation = (props: Props) => {
  const navigation = useNavigation<AddPhotosProp>();
  React.useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	});
  return (
    <View className='flex-1 align-middle justify-center'>
      <Text>Send For Help 3 SetLocation Screen</Text>
      <Button onPress={() => navigation.navigate('AddPhotos')}>Next</Button>
    </View>
  )
}

export default SetLocation