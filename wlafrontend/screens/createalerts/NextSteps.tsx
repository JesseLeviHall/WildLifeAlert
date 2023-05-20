import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, Button } from 'native-base';

type RootStackParamList = {
	PublicMap: undefined;
};
type PublicMapProp = NavigationProp<RootStackParamList, 'PublicMap'>;
type Props = {
	navigation: PublicMapProp;
};
const screenHeight = Dimensions.get('window').height;
const NextSteps = (props: Props) => {
  const navigation = useNavigation<PublicMapProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <LinearGradient
			style={{ height: screenHeight }}
			colors={['#0DE69A', '#71D1C7', '#99BBE3']}>
    <View className='flex-1 align-middle justify-center'>
      <Text>Send For Help 6 Next Steps Screen</Text>
      <Button onPress={() => navigation.navigate('PublicMap')}>Finish</Button>
    </View>
    </LinearGradient>
  )
}

export default NextSteps