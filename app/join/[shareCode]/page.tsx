'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { memberApi } from '@/lib/api/member';
import { useAuthStore } from '@/store/auth.store';

export default function JoinPage() {
  const { shareCode } = useParams<{ shareCode: string }>();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    // Tạm thời bỏ check isAuthenticated để test UI dễ hơn
    // if (!isAuthenticated) {
    //   router.push(`/login?redirect=/join/${shareCode}`);
    //   return;
    // }

    // Gọi API đã được mock
    memberApi
      .joinByShareCode(shareCode)
      .then((board) => {
        setStatus('success');
        setTimeout(() => router.push(`/board/${board.id}`), 1000);
      })
      .catch((err) => {
        setStatus('error');
        setError(err?.message ?? 'Không thể tham gia bảng vẽ');
      });
  }, [shareCode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 page-fade-in relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[100px]" />
      
      <div className="glass rounded-[2.5rem] p-12 text-center max-w-sm w-full relative z-10 shadow-2xl">
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            <div>
               <h2 className="text-xl font-bold text-white mb-2">Joining Board</h2>
               <p className="text-slate-500 text-sm font-medium">Validating share code: <span className="text-indigo-400">{shareCode}</span></p>
            </div>
          </div>
        )}
        
        {status === 'success' && (
          <div className="flex flex-col items-center gap-6 animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
               <h2 className="text-xl font-bold text-white mb-2">Welcome!</h2>
               <p className="text-emerald-400/80 text-sm font-bold uppercase tracking-widest">Entry Granted</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-6 animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-3xl bg-rose-500/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
               <h2 className="text-xl font-bold text-white mb-2">Join Failed</h2>
               <p className="text-rose-400 text-sm font-medium">{error}</p>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 h-10 rounded-xl bg-white/5 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Back to Safety
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
