import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, AnotherScreen } from './screens/Screen_Index.js';

const Stack = createNativeStackNavigator();

const StackNavigator = 
() => {
  return (
   <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AnotherScreen" component={AnotherScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;