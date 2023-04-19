import React from 'react';
import { Text, View } from 'react-native';

type Props = {};

const AnotherScreen = (props: Props) => {
  return (
    <View className=' flex-auto align-middle justify-center' >
      <Text className='text-lg'>Another Screen</Text>
    </View>
  );
};

export default AnotherScreen;
