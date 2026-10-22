import apiClient from './client';
import type { WhiteboardDetail } from '@/types/whiteboard';

export const memberApi = {
  async joinByShareCode(shareCode: string): Promise<WhiteboardDetail> {
    // const { data } = await apiClient.post<WhiteboardDetail>(
    //   `/whiteboards/join/${shareCode}`
    // );
    // return data;

    // Trả về dữ liệu giả lập để UI có thể chạy tiếp
    return {
      id: 'mock_board_id',
      title: 'Dự án Collaborative Whiteboard (Demo)',
      ownerId: 'user_1',
      visibility: 'LINK_ONLY',
      shareCode: shareCode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      members: [],
      myRole: 'EDITOR'
    };
  },
};
