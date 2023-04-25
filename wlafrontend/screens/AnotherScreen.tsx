import React from 'react';
import { componentOne } from '../components/componentOne';
import { Text, View } from 'react-native';

type Props = {};

const AnotherScreen = (props: Props) => {
  return (
    <View className=' flex-auto align-middle justify-center' >
      <Text className='text-lg'>Another Screen</Text>
      <componentOne />
    </View>
  );
};

export default AnotherScreen;
