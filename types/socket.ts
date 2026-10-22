import type { WhiteboardObject, CreateObjectPayload, UpdateObjectPayload, DeleteObjectPayload } from './object';

// ── Emit payloads (client → server) ──────────────────────────────────────────
export interface JoinRoomPayload {
  whiteboardId: string;
}

export interface LeaveRoomPayload {
  whiteboardId: string;
}

export interface CursorMovePayload {
  whiteboardId: string;
  x: number;
  y: number;
}

export interface ClearBoardPayload {
  whiteboardId: string;
}

// ── Listen events (server → client) ──────────────────────────────────────────
export interface ObjectCreatedEvent {
  object: WhiteboardObject;
}

export interface ObjectUpdatedEvent {
  object: WhiteboardObject;
}

export interface ObjectDeletedEvent {
  objectId: string;
}

export interface BoardClearedEvent {
  whiteboardId: string;
}

export interface UserJoinedEvent {
  userId: string;
  displayName: string;
  avatarUrl?: string;
}

export interface UserLeftEvent {
  userId: string;
}

export interface CursorMovedEvent {
  userId: string;
  displayName: string;
  x: number;
  y: number;
}

// ── Socket event name constants ───────────────────────────────────────────────
export const SOCKET_EVENTS = {
  // emit
  JOIN_ROOM: 'whiteboard:join',
  LEAVE_ROOM: 'whiteboard:leave',
  OBJECT_CREATE: 'object:create',
  OBJECT_UPDATE: 'object:update',
  OBJECT_DELETE: 'object:delete',
  BOARD_CLEAR: 'board:clear',
  CURSOR_MOVE: 'cursor:move',
  // listen
  OBJECT_CREATED: 'object:created',
  OBJECT_UPDATED: 'object:updated',
  OBJECT_DELETED: 'object:deleted',
  BOARD_CLEARED: 'board:cleared',
  USER_JOINED: 'user:joined',
  USER_LEFT: 'user:left',
  CURSOR_MOVED: 'cursor:moved',
} as const;
