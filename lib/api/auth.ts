import type { User, AuthResponse, LoginPayload, RegisterPayload } from '@/types/user';
import apiClient from './client';
import Cookies from 'js-cookie';

const MOCK_USER: User = {
  id: 'user_1',
  email: 'junior@whiteboard.com',
  displayName: 'Junior Developer',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  createdAt: new Date().toISOString(),
};

export const authApi = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
       const response= await apiClient.post("/auth/register",payload)
        return {accessToken:response.data.accessToken,refreshToken:response.data.refreshToken}
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
         const response= await apiClient.post("/auth/login",payload)
          return {accessToken:response.data.accessToken,refreshToken:response.data.refreshToken}
         
;
  },

  // async getMe(): Promise<AuthResponse['user']> {
 
  //   return MOCK_USER;
  // },
  
  logout() {
    Cookies.remove('token');
  },

  saveToken(token: string) {
    Cookies.set('token', token, { expires: 7, path: '/' });
  },
};
