import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, Button } from 'native-base';

type RootStackParamList = {
	ConfirmPost: undefined;
};
type ConfirmPostProp = NavigationProp<RootStackParamList, 'ConfirmPost'>;
type Props = {
	navigation: ConfirmPostProp;
};

const screenHeight = Dimensions.get('window').height;
const AddPhotos = (props: Props) => {
  const navigation = useNavigation<ConfirmPostProp>();
  React.useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Add Photos',
			 headerTintColor: '#000000', 
      headerStyle: { backgroundColor: '#71D1C7' },
		});
	});
  return (
     <LinearGradient
			style={{ height: screenHeight }}
			colors={['#0DE69A', '#71D1C7', '#99BBE3']}>
    <View className='flex-1 align-middle justify-center'>
      <Text>Send For Help 4 Photos Screen</Text>
      <Button onPress={() => navigation.navigate('ConfirmPost')}>Next</Button>
    </View>
    </LinearGradient>
  )
}

export default AddPhotos