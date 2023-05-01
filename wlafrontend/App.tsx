import React from 'react';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient, focusManager } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { AppStateStatus, Platform } from 'react-native';
import { useAppState } from './hooks/useAppState';
import { useOnlineManager } from './hooks/useOnlineManager';



const queryClient = new QueryClient({
   defaultOptions: {
    queries: {
      retry: 2,
      staleTime: Infinity,
      cacheTime: Infinity
    },
      mutations: {
        cacheTime: Infinity,
        retry: 2,
      },
    },
  });

const asyncPersist = createAsyncStoragePersister({
  storage: AsyncStorage,
});

function onAppStateChange(status: AppStateStatus) {
  if (status === 'active' || status === 'background') {
    queryClient.resumePausedMutations();
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }
}


export default function App() {
  useAppState(onAppStateChange);
  useOnlineManager();
  
  return (
    <NavigationContainer>
      <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        maxAge: Infinity,
        persister: asyncPersist,
      }}
      onSuccess={() =>
        queryClient
          .resumePausedMutations()
          .then(() => queryClient.invalidateQueries())
      }
    >
    		<StackNavigator />
      </PersistQueryClientProvider>
    </NavigationContainer>
  );
}


