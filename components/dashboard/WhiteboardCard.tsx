'use client';

import Link from 'next/link';
import { MoreHorizontal, Users, Trash2, ArrowRight, Lock, Globe, Clock } from 'lucide-react';
import type { Whiteboard } from '@/types/whiteboard';
import { formatDate } from '@/lib/utils';
import ViewTransition from '@/components/ui/view-transition';

interface Props {
  board: Whiteboard;
  onDelete?: (id: string) => void;
}

export default function WhiteboardCard({ board, onDelete }: Props) {
  return (
    <article className="group bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
         <div className={cn(
           "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2",
           board.visibility === 'PRIVATE' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
         )}>
           {board.visibility === 'PRIVATE' ? <Lock size={12} /> : <Globe size={12} />}
           {board.visibility}
         </div>
         <button className="text-slate-400 hover:text-slate-900 transition-colors">
            <MoreHorizontal size={20} />
         </button>
      </div>

      <ViewTransition name={`board-title-${board.id}`}>
        <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors">
          {board.title}
        </h3>
      </ViewTransition>
      
      <p className="text-slate-500 text-sm font-medium mb-10 line-clamp-2">
         Advanced collaborative architecture and neural whiteboard for high-fidelity sync.
      </p>

      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-9 h-9 rounded-full ring-2 ring-white bg-slate-100 overflow-hidden shadow-sm">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${board.id}${i}`} alt="Collaborator" />
                </div>
              ))}
           </div>
           <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Clock size={12} /> 2m ago
           </span>
        </div>
        
        <Link
          href={`/board/${board.id}`}
          className="w-11 h-11 rounded-full bg-slate-50 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-all duration-500 shadow-sm"
        >
          <ArrowRight size={20} />
        </Link>
      </div>
    </article>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
