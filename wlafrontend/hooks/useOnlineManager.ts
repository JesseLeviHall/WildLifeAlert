import * as React from 'react';
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import { Platform } from 'react-native';

export function useOnlineManager() {
  const [isOnline, setIsOnline] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      return NetInfo.addEventListener((state) => {
        const onlineStatus =
          state.isConnected != null &&
          state.isConnected &&
          Boolean(state.isInternetReachable);
          
        // update the onlineManager's status
        onlineManager.setOnline(onlineStatus);

        // also update our own state's status
        setIsOnline(onlineStatus);
      });
    }
  }, []);

  // return our own state's online status
  return isOnline;
}
