import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, AnotherScreen, RescuerLogin, RescuerRegister, RescuerPrefs, Resources, About, SendForHelp, AlertsNearby, ColdAlerts, AlertDetails, PublicMap } from './screens/Screen_Index.js';

const Stack = createNativeStackNavigator();

const StackNavigator = 
() => {
  return (
   <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="SendForHelp" component={SendForHelp} />
       <Stack.Screen name="Resources" component={Resources} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="AnotherScreen" component={AnotherScreen} />
      <Stack.Screen name="RescuerLogin" component={RescuerLogin} />
      <Stack.Screen name="RescuerRegister" component={RescuerRegister} />
      <Stack.Screen name="AlertsNearby" component={AlertsNearby} />
      <Stack.Screen name="ColdAlerts" component={ColdAlerts} />
      <Stack.Screen name="AlertDetails" component={AlertDetails} />
      <Stack.Screen name="RescuerPrefs" component={RescuerPrefs} />
      <Stack.Screen name="PublicMap" component={PublicMap} />
    </Stack.Navigator>
  );
}

export default StackNavigator;