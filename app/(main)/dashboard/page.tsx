'use client';

import { useState } from 'react';
import { Plus, Settings, LayoutGrid, Search, Clock, Users, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import CreateBoardModal from '@/components/dashboard/CreateBoardModal';
import { ULTRA_BOARDS } from '@/lib/mockData';
import WhiteboardCard from '@/components/dashboard/WhiteboardCard';

const NAV_ITEMS = [
  { icon: <LayoutGrid size={20} />, label: 'All Projects', active: true },
  { icon: <Star size={20} />, label: 'Favorites', active: false },
  { icon: <Clock size={20} />, label: 'Recent', active: false },
  { icon: <Users size={20} />, label: 'Shared with me', active: false },
];

export default function DashboardPage() {
  const [showCreate, setShowCreate] = useState(false);
  
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#F8FAFC] font-sans page-enter">
      {/* Structural Layout */}
      <div className="flex h-full">
        {/* Sleek Professional Sidebar */}
        <aside className="w-72 border-r border-slate-200 bg-white p-8 hidden lg:flex flex-col">
           <div className="mb-12">
              <div className="flex items-center gap-3 mb-10">
                 <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                    <LayoutGrid size={22} className="stroke-[2.5px]" />
                 </div>
                 <span className="text-xl font-black text-slate-900 tracking-tight">WhiteboardPro</span>
              </div>

              <nav className="space-y-1">
                 {NAV_ITEMS.map((item) => (
                    <button
                      key={item.label}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                        item.active 
                          ? "bg-indigo-50 text-indigo-600" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                       {item.icon}
                       {item.label}
                    </button>
                 ))}
              </nav>
           </div>

           <div className="mt-auto">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Storage</p>
                 <div className="h-2 w-full bg-slate-200 rounded-full mb-2 overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[65%]" />
                 </div>
                 <p className="text-[11px] font-medium text-slate-600">6.5 GB of 10 GB used</p>
              </div>
           </div>
        </aside>

        {/* Workspace Main Content */}
        <main className="flex-1 p-10 lg:p-16 overflow-y-auto custom-scrollbar">
           <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
              <div>
                 <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Projects</h1>
                 <p className="text-slate-500 font-medium">Manage and organize your team&apos;s creative canvas.</p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                 <div className="relative flex-1 md:w-80 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search files..."
                      className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm"
                    />
                 </div>
                 <button 
                   onClick={() => setShowCreate(true)}
                   className="h-12 px-6 bg-indigo-600 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all"
                 >
                    <Plus size={20} className="stroke-[3px]" />
                    New Project
                 </button>
              </div>
           </header>

           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {ULTRA_BOARDS.map((board) => (
                <WhiteboardCard key={board.id} board={board} />
              ))}

              {/* Add Project Placeholder */}
              <button 
                onClick={() => setShowCreate(true)}
                className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
              >
                 <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                    <Plus size={32} />
                 </div>
                 <p className="font-bold text-sm tracking-tight">Create workspace</p>
              </button>
           </div>
        </main>
      </div>

      <CreateBoardModal open={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  );
}
