import React from 'react';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';


const queryClient = new QueryClient({
   defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity
    },
      mutations: {
        cacheTime: Infinity,
        retry: 0,
      },
    },
  });

const asyncPersist = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export default function App() {
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


