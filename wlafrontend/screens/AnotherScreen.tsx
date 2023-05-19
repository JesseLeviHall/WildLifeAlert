import React from 'react';
import ComponentOne from "../components/componentOne"
import { Text, View } from 'react-native';

type Props = {
};

const AnotherScreen = (props: Props) => {
  return (
    <View className=' flex-auto align-middle justify-center' >
      <Text className='text-lg'>Placeholder for Admin Screen To Come Later</Text>
      <ComponentOne />
    </View>
  );
};

export default AnotherScreen;

