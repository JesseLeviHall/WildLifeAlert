import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, AnotherScreen, RescuerLogin, RescuerRegister, RescuerPrefs } from './screens/Screen_Index.js';

const Stack = createNativeStackNavigator();

const StackNavigator = 
() => {
  return (
   <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AnotherScreen" component={AnotherScreen} />
      <Stack.Screen name="RescuerLogin" component={RescuerLogin} />
      <Stack.Screen name="RescuerRegister" component={RescuerRegister} />
      <Stack.Screen name="RescuerPrefs" component={RescuerPrefs} />
    </Stack.Navigator>
  );
}

export default StackNavigator;