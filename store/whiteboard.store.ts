import { create } from 'zustand';
import type { Whiteboard, WhiteboardDetail, WhiteboardMember, MemberRole } from '@/types/whiteboard';
import type { WhiteboardObject } from '@/types/object';

interface WhiteboardState {
  boards: Whiteboard[];
  currentBoard: WhiteboardDetail | null;
  objects: WhiteboardObject[];
  onlineMembers: WhiteboardMember[];
  myRole: MemberRole | null;

  setBoards: (boards: Whiteboard[]) => void;
  addBoard: (board: Whiteboard) => void;
  removeBoard: (id: string) => void;

  setCurrentBoard: (board: WhiteboardDetail) => void;
  clearCurrentBoard: () => void;

  setObjects: (objects: WhiteboardObject[]) => void;
  addObject: (object: WhiteboardObject) => void;
  updateObject: (object: WhiteboardObject) => void;
  removeObject: (objectId: string) => void;
  clearObjects: () => void;

  setOnlineMembers: (members: WhiteboardMember[]) => void;
  addOnlineMember: (member: Pick<WhiteboardMember, 'userId'> & { displayName: string; avatarUrl?: string }) => void;
  removeOnlineMember: (userId: string) => void;
}

export const useWhiteboardStore = create<WhiteboardState>((set) => ({
  boards: [],
  currentBoard: null,
  objects: [],
  onlineMembers: [],
  myRole: null,

  setBoards: (boards) => set({ boards }),
  addBoard: (board) => set((s) => ({ boards: [board, ...s.boards] })),
  removeBoard: (id) => set((s) => ({ boards: s.boards.filter((b) => b.id !== id) })),

  setCurrentBoard: (board) =>
    set({ currentBoard: board, myRole: board.myRole }),
  clearCurrentBoard: () =>
    set({ currentBoard: null, objects: [], onlineMembers: [], myRole: null }),

  setObjects: (objects) => set({ objects }),
  addObject: (object) => set((s) => ({ objects: [...s.objects, object] })),
  updateObject: (object) =>
    set((s) => ({ objects: s.objects.map((o) => (o.id === object.id ? object : o)) })),
  removeObject: (objectId) =>
    set((s) => ({ objects: s.objects.filter((o) => o.id !== objectId) })),
  clearObjects: () => set({ objects: [] }),

  setOnlineMembers: (onlineMembers) => set({ onlineMembers }),
  addOnlineMember: (member) =>
    set((s) => {
      const exists = s.onlineMembers.some((m) => m.userId === member.userId);
      if (exists) return s;
      return {
        onlineMembers: [
          ...s.onlineMembers,
          {
            id: member.userId,
            userId: member.userId,
            whiteboardId: s.currentBoard?.id ?? '',
            role: 'VIEWER' as MemberRole,
            joinedAt: new Date().toISOString(),
            user: { id: member.userId, displayName: member.displayName, avatarUrl: member.avatarUrl },
          },
        ],
      };
    }),
  removeOnlineMember: (userId) =>
    set((s) => ({ onlineMembers: s.onlineMembers.filter((m) => m.userId !== userId) })),
}));
