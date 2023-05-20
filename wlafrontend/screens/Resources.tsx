import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;

type Props = {}

const Resources = (props: Props) => {
  return (
    <LinearGradient
      style={{ height: screenHeight }}
      colors={['#0DE69A', '#71D1C7', '#99BBE3']}
    >
     <View className='h-full'></View>
        
     
    </LinearGradient>
  );
}

export default Resources;


 /*<a href="https://ahnow.org" target="_blank">
<Image source="https://ahnow.org/images/weblink_small.png"></Image>Visit AnimalHelpNow.org for assistance with wildlife emergencies throughout the United States.</a>  */