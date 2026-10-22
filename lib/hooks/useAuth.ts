'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { authApi } from '../api/auth';
import { RegisterPayload } from '@/types/user';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = useCallback(async (values: any) => {
    setLoading(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1000));
    
    // const mockUser = {
    //   id: 'u1',
    //   name: 'Alex Rivera',
    //   email: values.email,
    //   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    // };
    
    // Cookies.set('token', 'mock-token-123');
    // setUser(mockUser);
    // localStorage.setItem('user', JSON.stringify(mockUser));
    const response = await authApi.login(values);

    Cookies.set('refresh-token', response.refreshToken);
    localStorage.setItem('access-token', response.accessToken)
  
    router.push('/dashboard');
    setLoading(false);
  }, [router]);

  const register = useCallback(async (values: RegisterPayload) => {
    setLoading(true);
     
    const respone = await authApi.register({
      email: values.email,
      password: values.password,
      name: values.name,
    });
    Cookies.set('refresh-token', respone.refreshToken);
     localStorage.setItem('access-token', respone.accessToken)
  
    router.push('/dashboard');
    setLoading(false);
  }, [router]);

  const logout = useCallback(() => {
    Cookies.remove('refresh-token');
    localStorage.removeItem('access-token');
    setUser(null);
    router.push('/login');
  }, [router]);

  return {
    user,
    loading,
    login,
    register,
    logout,
  };
}
