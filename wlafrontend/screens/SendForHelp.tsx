import React from 'react'
import { ImageBackground, Text } from 'react-native';
import Svg, { Image } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';


const screenHeight = Dimensions.get('window').height;
type Props = {}

const SendForHelp = (props: Props) => {
  return (
    <LinearGradient
			style={{ height: screenHeight }}
			colors={['#33fff2', '#4deefc', '#a6cedd']}>
    </LinearGradient>
  )
}

export default SendForHelp