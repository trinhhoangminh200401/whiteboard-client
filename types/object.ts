export type ObjectType = 'PEN' | 'LINE' | 'RECT' | 'CIRCLE' | 'TEXT' | 'ARROW';

export interface Point {
  x: number;
  y: number;
}

export interface ObjectData {
  points?: Point[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  text?: string;
  strokeColor: string;
  fillColor?: string;
  strokeWidth: number;
  opacity?: number;
  roughness?: number;
}

export interface WhiteboardObject {
  id: string;
  whiteboardId: string;
  type: ObjectType;
  data: ObjectData;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateObjectPayload {
  whiteboardId: string;
  type: ObjectType;
  data: ObjectData;
}

export interface UpdateObjectPayload {
  objectId: string;
  whiteboardId: string;
  data: Partial<ObjectData>;
}

export interface DeleteObjectPayload {
  objectId: string;
  whiteboardId: string;
}
