import React from 'react'
import { View, Text, Button } from 'native-base';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
	NextSteps: undefined;
};
type NextStepsProp = NavigationProp<RootStackParamList, 'NextSteps'>;
type Props = {
	navigation: NextStepsProp;
};


const ConfirmPost = (props: Props) => {
  const navigation = useNavigation<NextStepsProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <View className='flex-1 align-middle justify-center'>
      <Text>Send For Help 5 Comfirmation Screen</Text>
      <Button onPress={() => navigation.navigate('NextSteps')}>Next</Button>
    </View>
  )
}

export default ConfirmPost