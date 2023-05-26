import React from 'react'
import { View, Text } from 'react-native'
type Props = {}

const SuccessToast = (props: Props) => {
  return (
    <View className='absolute mt-96 bg-[#bad1e8] opacity-50  p-2 rounded-xl self-center z-50'>
    <Text className='text-lg font-semibold'>Location Saved</Text>
  </View>
    
  )
}

export default SuccessToast