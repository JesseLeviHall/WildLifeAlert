import React from 'react';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  return (
    <NavigationContainer>
    		<StackNavigator />
    </NavigationContainer>
  );
}


