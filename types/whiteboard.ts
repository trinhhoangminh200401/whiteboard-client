export type WhiteboardVisibility = 'PUBLIC' | 'LINK_ONLY' | 'PRIVATE';
export type MemberRole = 'OWNER' | 'EDITOR' | 'VIEWER';

export interface Whiteboard {
  id: string;
  title: string;
  ownerId?: string;
  visibility: WhiteboardVisibility;
  shareCode: string;
  canvasData?: string | null;
  createdAt: string;
  updatedAt: string;
  userId?: string;
}

export interface WhiteboardMember {
  id: string;
  userId: string;
  whiteboardId: string;
  role: MemberRole;
  user?: {
    id: string;
    displayName: string;
    avatarUrl?: string;
  };
  joinedAt: string;
}

export interface CreateWhiteboardPayload {
  title: string;
  visibility?: WhiteboardVisibility;
}

export interface WhiteboardDetail extends Whiteboard {
  members: WhiteboardMember[];
  myRole: MemberRole;
}
