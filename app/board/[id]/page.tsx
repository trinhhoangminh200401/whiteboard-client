'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Share2, Users, Download, HelpCircle, History, MousePointer2 } from 'lucide-react';
import { useWhiteboard } from '@/lib/hooks/useWhiteboard';
import { useSocket } from '@/lib/hooks/useSocket';
import Whiteboard from '@/components/whiteboard/Whiteboard';
import Toolbar from '@/components/whiteboard/Toolbar';
import ShareModal from '@/components/whiteboard/ShareModal';
import ViewTransition from '@/components/ui/view-transition';

function BoardContent() {
  const params = useParams();
  const id = params.id as string;
  const { currentBoard, fetchBoard, loading } = useWhiteboard();
  const { members } = useSocket(id);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    fetchBoard(id);
  }, [id]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8FAFC] font-sans relative">
      <div className="absolute inset-0 whiteboard-grid opacity-50 pointer-events-none" />

      <header className="fixed top-6 left-6 right-6 z-[100] h-16 bg-white border border-slate-200 rounded-2xl shadow-sm px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
          >
            <ChevronLeft size={20} />
          </Link>

          <div className="h-6 w-px bg-slate-200" />

          <div className="flex flex-col">
             <ViewTransition name={`board-title-${id}`}>
                <h1 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                   {currentBoard?.title || 'Initializing...'}
                   <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-[10px] text-indigo-600 font-bold uppercase tracking-wider">Draft</span>
                </h1>
             </ViewTransition>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Last saved 30 seconds ago</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-6 mr-6 h-full px-6 border-x border-slate-50">
              <div className="flex -space-x-2">
                 {members.slice(0, 3).map((m: any, i: number) => (
                    <div key={i} className="w-8 h-8 rounded-full ring-2 ring-white bg-slate-100 overflow-hidden shadow-sm">
                       <img src={m.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Peer" />
                    </div>
                 ))}
                 {members.length > 3 && (
                    <div className="w-8 h-8 rounded-full ring-2 ring-white bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                       +{members.length - 3}
                    </div>
                 )}
              </div>
              <button className="flex items-center gap-2 text-indigo-600 font-bold text-xs hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                 <Users size={14} /> Invite
              </button>
           </div>

           <div className="flex items-center gap-2">
              <button
                onClick={() => setShowShare(true)}
                className="h-10 px-5 bg-indigo-600 text-white font-bold text-sm rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/10"
              >
                <Share2 size={16} /> Share
              </button>
              <button className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
                <HelpCircle size={20} />
              </button>
           </div>
        </div>
      </header>

      <main className="flex-1 relative pt-24">
        {loading ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
             <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-[3px] border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="font-bold text-xs text-slate-400 uppercase tracking-[0.2em]">Preparing Canvas</p>
             </div>
          </div>
        ) : (
          <div className="w-full h-full animate-in fade-in duration-500">
             <Whiteboard id={id} />
          </div>
        )}

        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[100]">
           <Toolbar />
        </div>

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] h-12 px-2 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-1">
           <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
              <History size={16} />
           </button>
           <div className="w-px h-4 bg-slate-200 mx-1" />
           <div className="flex items-center gap-3 px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <MousePointer2 size={12} className="text-indigo-600" />
              Standard Mode
           </div>
           <div className="w-px h-4 bg-slate-200 mx-1" />
           <button className="flex items-center gap-2 px-3 text-[10px] font-black text-slate-900 uppercase tracking-widest hover:text-indigo-600">
              Export Scene <Download size={14} />
           </button>
        </div>
      </main>

      {currentBoard && (
        <ShareModal open={showShare} onClose={() => setShowShare(false)} shareCode={currentBoard.shareCode} />
      )}
    </div>
  );
}

export default function BoardPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-[#F8FAFC]"><div className="w-8 h-8 border-[3px] border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <BoardContent />
    </Suspense>
  );
}
