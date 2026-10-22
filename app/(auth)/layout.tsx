'use client';

import { LayoutGrid } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Abstract Background Element */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-500/5 blur-[120px] rounded-full" />
         <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full  z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 mb-6 group hover:rotate-12 transition-transform duration-500">
             <LayoutGrid size={28} className="stroke-[2.5px]" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">WhiteboardPro</h1>
          <p className="text-slate-500 font-medium text-sm mt-2">Design, collaborate, and build faster.</p>
        </div>

      <section className="relative w-full min-w-0 overflow-hidden rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-[0_30px_80px_rgba(30,41,59,0.13)] backdrop-blur-2xl sm:p-10">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400" />

      <div className="relative w-full min-w-0">
        {children}
      </div>
    </section>
            
        <footer className="mt-12 text-center">
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Trusted by 50,000+ creative teams worldwide
           </p>
        </footer>
      </div>
    </div>
  );
}
