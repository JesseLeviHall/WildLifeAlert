/*

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import  RescuerLogin from '../screens/rescuerArea/RescuerLogin';
import  PublicMap from '../screens/PublicMap';
import  Resources from '../screens/Resources';
import  About from '../screens/About';

const Tab = createMaterialBottomTabNavigator();

export default function HomeBotNav() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="RescuerLogin"
        component={RescuerLogin}
        navigation={navigation}
        options={{
          tabBarLabel: 'Rescuers',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="PublicMap"
        component={PublicMap}
        options={{
          tabBarLabel: 'Live Map',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Resources"
        component={Resources}
        options={{
          tabBarLabel: 'Resources',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

*/