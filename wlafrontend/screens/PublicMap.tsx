import React from 'react'
import { Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';


const screenHeight = Dimensions.get('window').height;

type Props = {}

const PublicMap = (props: Props) => {
  return (
    <LinearGradient
			style={{ height: screenHeight }}
			colors={['#33fff2', '#4deefc', '#a6cedd']}>
     <Text>Public Map</Text>
    </LinearGradient>
  )
}

export default PublicMap