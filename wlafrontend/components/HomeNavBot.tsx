import React from 'react'
import { Text, View,  } from 'react-native'
import { TouchableRipple } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Box, HStack } from 'native-base';

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
      <HStack space={3} justifyContent="center" bg="primary.500">
        <TouchableRipple onPress={() => navigation.navigate('RescuerLogin')}><Box p="2" alignItems="center" _text={{
      fontSize: 'md',
      fontWeight: 'medium',
      letterSpacing: 'lg'}}><MaterialCommunityIcons name="launch" size={28} />
        Rescuers</Box></TouchableRipple>

        <TouchableRipple onPress={() => navigation.navigate('PublicMap')}><Box p="2" alignItems="center" _text={{
      fontSize: 'md',
      fontWeight: 'medium',
      letterSpacing: 'lg'}}><MaterialCommunityIcons name="latitude" size={28} />
        Live Map</Box></TouchableRipple>

        <TouchableRipple onPress={() => navigation.navigate('Resources')}><Box p="2" alignItems="center" _text={{
      fontSize: 'md',
      fontWeight: 'medium',
      letterSpacing: 'lg'}}><MaterialCommunityIcons name="magnify-expand" size={28}  />
        Resources</Box></TouchableRipple>

        <TouchableRipple onPress={() => navigation.navigate('About')}><Box p="2" alignItems="center" _text={{
      fontSize: 'md',
      fontWeight: 'medium',
      letterSpacing: 'lg'}}><MaterialCommunityIcons name="lightbulb-on" size={28} />
       About</Box></TouchableRipple>
      </HStack>
  )
}

export default HomeNavBot