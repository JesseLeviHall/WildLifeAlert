import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useAppState } from './useAppState';
import { useOnlineManager } from './useOnlineManager';

export function useConnectivity() {
  const isConnected = useOnlineManager();
  const queryClient = useQueryClient();

  useAppState((status) => {
    if (status === 'active') {
      queryClient.resumePausedMutations();
    }
  });

  return isConnected;
}
