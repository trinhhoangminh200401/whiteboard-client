'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, LogOut, Settings, Layers, Box } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import Avatar from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ViewTransition } from 'react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutGrid size={22} /> },
  { href: '/projects', label: 'Projects', icon: <Box size={22} /> },
  { href: '/assets', label: 'Assets', icon: <Layers size={22} /> },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen flex bg-slate-950 selection:bg-teal-500/30 selection:text-teal-200">
      {/* Premium Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-[0.05]" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-500/[0.02] via-transparent to-orange-500/[0.02]" />
      </div>

      {/* Sidebar with ViewTransition Identity */}
      <aside className="w-72 shrink-0 p-8 flex flex-col z-20 relative">
        <div className="glass-panel flex flex-col h-full rounded-[3rem] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_1px_1px_rgba(255,255,255,0.05)_inset] relative overflow-hidden">
          
          {/* Morphing Logo Area */}
          <Link href="/dashboard" className="flex items-center gap-4 mb-14 px-2 hover:opacity-80 transition-opacity clickable">
            <ViewTransition name="app-logo">
              <div className="w-12 h-12 rounded-2xl bg-[#0d9488] flex items-center justify-center shadow-xl shadow-teal-900/40">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </ViewTransition>
            <div className="animate-reveal">
              <span className="block text-xl font-black text-white tracking-tighter leading-none">V-BOARD</span>
              <span className="block text-[9px] text-slate-500 font-black uppercase tracking-[0.3em] mt-1">Next Gen</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-3">
            <p className="text-[10px] font-black text-slate-600 px-4 mb-4 uppercase tracking-[0.3em]">Menu</p>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-4 px-5 h-14 rounded-2xl font-bold transition-all duration-500 group relative clickable',
                  pathname === item.href
                    ? 'bg-teal-500 text-white shadow-xl shadow-teal-500/20'
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                )}
              >
                <span className={cn('transition-transform duration-300', pathname === item.href ? 'scale-110' : 'group-hover:scale-110')}>
                  {item.icon}
                </span>
                <span className="tracking-tight">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Section with ViewTransition */}
          <div className="mt-auto pt-8 border-t border-white/5">
             <div className="flex items-center gap-4 p-4 rounded-[2rem] bg-white/5 border border-white/5 group relative">
                <ViewTransition name="user-avatar">
                   <Avatar name={user?.displayName ?? 'U'} avatarUrl={user?.avatarUrl} size="md" className="ring-2 ring-teal-500/20" />
                </ViewTransition>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-white truncate tracking-tight">{user?.displayName}</p>
                  <p className="text-[10px] text-teal-400 font-black uppercase tracking-widest mt-1">Author</p>
                </div>
                <button onClick={logout} className="p-2 text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all clickable">
                  <LogOut size={20} />
                </button>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Container - Wrap Children in Transition Boundary */}
      <main className="flex-1 flex flex-col p-8 z-10 relative overflow-hidden">
        <ViewTransition name="main-content">
          <div className="glass-panel flex-1 rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col relative page-fade-in">
             <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
             {children}
          </div>
        </ViewTransition>
      </main>
    </div>
  );
}
