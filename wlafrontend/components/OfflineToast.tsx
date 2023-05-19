import React from 'react'
import { View, Text } from 'react-native'
type Props = {}

const OfflineToast = (props: Props) => {
  return (
    <View className=' flex-1 align-middle justify-center h-12 w-full bg-transparent'><Text>You are currently offline. You can still post an Alert and when you reconnect the data will sync automatically</Text></View>
  )
}

export default OfflineToast