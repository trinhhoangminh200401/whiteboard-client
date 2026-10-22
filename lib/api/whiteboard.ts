import type {
  Whiteboard,
  WhiteboardDetail,
  CreateWhiteboardPayload,
} from '@/types/whiteboard';
import apiClient from './client';

const MOCK_BOARDS: Whiteboard[] = [
  {
    id: 'board_1',
    title: 'Dự án Mobile App 2024',
    ownerId: 'user_1',
    visibility: 'PRIVATE',
    shareCode: 'mobi123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'board_2',
    title: 'Brainstorming UI/UX',
    ownerId: 'user_2',
    visibility: 'LINK_ONLY',
    shareCode: 'uiux456',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  }
];

export const whiteboardApi = {
  async getMyBoards(): Promise<Whiteboard[]> {
    // const { data } = await apiClient.get<Whiteboard[]>('/whiteboards');
    // return data;
    return MOCK_BOARDS;
  },

  async getById(id: string): Promise<WhiteboardDetail> {
    // const { data } = await apiClient.get<WhiteboardDetail>(`/whiteboards/${id}`);
    // return data;
    return {
      ...MOCK_BOARDS[0],
      members: [],
      myRole: 'OWNER'
    };
  },

  async create(payload: CreateWhiteboardPayload): Promise<Whiteboard> {
    // const { data } = await apiClient.post<Whiteboard>('/whiteboards', payload);
    // return data;
    return {
      id: 'new_board',
      title: payload.title,
      ownerId: 'user_1',
      visibility: payload.visibility || 'LINK_ONLY',
      shareCode: 'NEW123',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  async delete(id: string): Promise<void> {
    // await apiClient.delete(`/whiteboards/${id}`);
  },

  async saveCanvas(id: string, canvasData: string): Promise<void> {
    // await apiClient.patch(`/whiteboards/${id}/canvas`, { canvasData });
  },
};
