'use client';

import { useState, useCallback } from 'react';
import { Whiteboard } from '@/types/whiteboard';
import { ULTRA_BOARDS } from '@/lib/mockData';

export function useWhiteboard() {
  const [boards, setBoards] = useState<Whiteboard[]>(ULTRA_BOARDS);
  const [currentBoard, setCurrentBoard] = useState<Whiteboard | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBoards = useCallback(async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 500));
    setBoards(ULTRA_BOARDS);
    setLoading(false);
  }, []);

  const fetchBoard = useCallback(async (id: string) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const board = ULTRA_BOARDS.find(b => b.id === id) || ULTRA_BOARDS[0];
    setCurrentBoard(board);
    setLoading(false);
  }, []);

  const createBoard = useCallback(async (data: Partial<Whiteboard>) => {
    const newBoard: Whiteboard = {
      id: `board-${Math.random().toString(36).substr(2, 9)}`,
      title: data.title || 'Untitled Board',
      userId: 'u1',

      visibility: data.visibility || 'PUBLIC',
      shareCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setBoards(prev => [newBoard, ...prev]);
    return newBoard;
  }, []);

  const deleteBoard = useCallback(async (id: string) => {
    setBoards(prev => prev.filter(b => b.id !== id));
  }, []);

  return {
    boards,
    currentBoard,
    loading,
    fetchBoards,
    fetchBoard,
    createBoard,
    deleteBoard,
  };
}
