import React from 'react'
import { Text, View,  } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type RootStackParamList = {
  Home: undefined;
  PublicMap: undefined;
  SendForHelp: undefined;
  About: undefined;
  RescuerLogin: undefined;
  Resources: undefined
};
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home' >;
type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeNavBot = (props: Props) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View>
      <View>
        <MaterialCommunityIcons name="launch" size={26} onPress={() => navigation.navigate('RescuerLogin')}  />
        <Text>Rescuers</Text>
        <MaterialCommunityIcons name="latitude" size={26} onPress={() => navigation.navigate('PublicMap')} />
        <Text>Live Map</Text>
        <MaterialCommunityIcons name="magnify-expand" size={26} onPress={() => navigation.navigate('Resources')} />
        <Text>Resources</Text>
        <MaterialCommunityIcons name="lightbulb-on" size={26} onPress={() => navigation.navigate('About')} />
        <Text>About</Text>
      </View>
    </View>
  )
}

export default HomeNavBot