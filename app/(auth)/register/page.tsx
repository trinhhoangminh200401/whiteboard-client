import type { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Đăng ký — Whiteboard',
  description: 'Tạo tài khoản Collaborative Whiteboard mới',
};

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-xl font-bold text-white mb-1">Tạo tài khoản</h1>
      <p className="text-sm text-slate-400 mb-6">Tham gia vào không gian vẽ cộng tác</p>
      <RegisterForm />
    </>
  );
}
