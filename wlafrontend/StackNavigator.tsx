import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Home,
  AnotherScreen,
  RescuerLogin,
  RescuerRegister,
  RescuerWelcome,
  RescuerPrefs,
  Resources,
  About,
  SendForHelp,
  AlertsNearby,
  ColdAlerts,
  AlertDetails,
  PublicMap,
  AlertDescription,
  SetLocation,
  AddPhotos,
  ConfirmPost,
  NextSteps,
} from "./screens/Screen_Index.js";
import { useAuth } from "@clerk/clerk-expo";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { isLoaded, sessionId } = useAuth();

  if (!isLoaded || !sessionId) {
    return null;
  }

  return (
    <Stack.Navigator>
      {sessionId ? (
        <Stack.Group>
          <Stack.Screen name="RescuerWelcome" component={RescuerWelcome} />
          <Stack.Screen name="RescuerPrefs" component={RescuerPrefs} />
        </Stack.Group>
      ) : (
        <Stack.Group>
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
          <Stack.Screen name="PublicMap" component={PublicMap} />
          <Stack.Screen name="AlertDescription" component={AlertDescription} />
          <Stack.Screen name="SetLocation" component={SetLocation} />
          <Stack.Screen name="AddPhotos" component={AddPhotos} />
          <Stack.Screen name="ConfirmPost" component={ConfirmPost} />
          <Stack.Screen name="NextSteps" component={NextSteps} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
