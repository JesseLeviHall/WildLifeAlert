import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Home,
  AnotherScreen,
  RescuerLogin,
  RescuerRegister,
  RescuerRegisterStepOne,
  RescuerRegisterStepTwo,
  RescuerWelcome,
  ForgotPassword,
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

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SendForHelp" component={SendForHelp} />
      <Stack.Screen name="Resources" component={Resources} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="AnotherScreen" component={AnotherScreen} />
      <Stack.Screen name="PublicMap" component={PublicMap} />
      <Stack.Screen name="AlertDescription" component={AlertDescription} />
      <Stack.Screen name="SetLocation" component={SetLocation} />
      <Stack.Screen name="AddPhotos" component={AddPhotos} />
      <Stack.Screen name="ConfirmPost" component={ConfirmPost} />
      <Stack.Screen name="NextSteps" component={NextSteps} />
      <Stack.Screen name="RescuerLogin" component={RescuerLogin} />
      <Stack.Screen name="RescuerRegister" component={RescuerRegister} />
      <Stack.Screen
        name="RescuerRegisterStepOne"
        component={RescuerRegisterStepOne}
      />
      <Stack.Screen
        name="RescuerRegisterStepTwo"
        component={RescuerRegisterStepTwo}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="RescuerWelcome" component={RescuerWelcome} />
      <Stack.Screen name="RescuerPrefs" component={RescuerPrefs} />
      <Stack.Screen name="AlertsNearby" component={AlertsNearby} />
      <Stack.Screen name="ColdAlerts" component={ColdAlerts} />
      <Stack.Screen name="AlertDetails" component={AlertDetails} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
