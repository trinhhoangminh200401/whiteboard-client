'use client';

import { useState, useEffect } from 'react';
import { ULTRA_MEMBERS } from '@/lib/mockData';

export function useSocket(boardId: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [members, setMembers] = useState<any[]>(ULTRA_MEMBERS);

  useEffect(() => {
    // Simulate socket connection
    setIsConnected(true);
    
    // Simulate other users joining/leaving periodically
    const interval = setInterval(() => {
      const randomCount = Math.floor(Math.random() * ULTRA_MEMBERS.length) + 1;
      setMembers(ULTRA_MEMBERS.slice(0, randomCount));
    }, 10000);

    return () => {
      setIsConnected(false);
      clearInterval(interval);
    };
  }, [boardId]);

  const emitEvent = (event: string, data: any) => {
    // console.log(`[Mock Socket] Emitting ${event}:`, data);
  };

  return {
    isConnected,
    members,
    emitEvent,
  };
}
