import React from 'react'
import { View, Text, Button } from 'native-base';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
	PublicMap: undefined;
};
type PublicMapProp = NavigationProp<RootStackParamList, 'PublicMap'>;
type Props = {
	navigation: PublicMapProp;
};

const NextSteps = (props: Props) => {
  const navigation = useNavigation<PublicMapProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <View className='flex-1 align-middle justify-center'>
      <Text>Send For Help 6 Next Steps Screen</Text>
      <Button onPress={() => navigation.navigate('PublicMap')}>Finish</Button>
    </View>
  )
}

export default NextSteps