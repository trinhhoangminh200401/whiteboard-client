import type { Metadata } from 'next';

import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Đăng nhập — WhiteboardPro',
  description: 'Đăng nhập vào Collaborative Whiteboard',
};

export default function LoginPage() {
  return (
    <>
      {/* <div className="mb-9">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#635BFF] to-[#3B82F6] shadow-[0_10px_25px_rgba(99,91,255,0.3)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-white"
            aria-hidden="true"
          >
            <path
              d="M5 5h5v5H5V5Zm9 0h5v5h-5V5ZM5 14h5v5H5v-5Zm9 0h5v5h-5v-5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Chào mừng trở lại
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
          Đăng nhập để tiếp tục thiết kế và cộng tác trên WhiteboardPro.
        </p>
      </div> */}

      <LoginForm />
    </>
  );
}