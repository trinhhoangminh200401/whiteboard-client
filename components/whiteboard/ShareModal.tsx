'use client';

import { useState } from 'react';
import { Copy, Check, X, Shield, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
  shareCode: string;
}

export default function ShareModal({ open, onClose, shareCode }: Props) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="w-full max-w-md bg-[#080808] border border-[#1a1a1a] p-10 relative animate-in zoom-in-95 duration-300">
        <div className="decal-corner decal-tl" />
        <div className="decal-corner decal-br" />
        
        <button onClick={onClose} className="absolute top-6 right-6 text-[#4a5568] hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-8 border-b border-[#1a1a1a] pb-6">
          <div className="w-12 h-12 bg-[#00ff41]/5 border border-[#00ff41]/20 flex items-center justify-center text-[#00ff41]">
             <Globe size={24} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-widest uppercase">Broadcast_Link</h3>
            <p className="font-mono text-[9px] text-[#4a5568] uppercase tracking-widest mt-1">Status: Uplink_Ready</p>
          </div>
        </div>

        <div className="space-y-8">
           <div>
              <p className="font-mono text-[10px] text-[#4a5568] uppercase mb-3 tracking-widest">Access_Token</p>
              <div className="flex gap-1">
                 <div className="flex-1 h-14 bg-black border border-[#1a1a1a] flex items-center px-6 font-mono text-sm text-white overflow-hidden whitespace-nowrap">
                    {shareCode}
                 </div>
                 <button 
                   onClick={handleCopy}
                   className={cn(
                     "w-14 h-14 flex items-center justify-center transition-all",
                     copied ? "bg-[#00ff41] text-black" : "bg-[#1a1a1a] text-white hover:bg-white hover:text-black"
                   )}
                 >
                   {copied ? <Check size={20} /> : <Copy size={20} />}
                 </button>
              </div>
           </div>

           <div className="p-6 bg-[#ff3e00]/5 border border-[#ff3e00]/20 relative">
              <div className="flex gap-4 items-start">
                 <Shield size={16} className="text-[#ff3e00] shrink-0 mt-1" />
                 <div>
                    <p className="font-mono text-[9px] font-bold text-[#ff3e00] uppercase mb-1">Security_Warning</p>
                    <p className="font-mono text-[10px] text-white/60 leading-normal">
                      This token grants administrative write access to the neural canvas. Only distribute to verified peers in secure nodes.
                    </p>
                 </div>
              </div>
           </div>

           <button 
             onClick={onClose}
             className="w-full h-14 border border-[#1a1a1a] text-white font-black text-[11px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all"
           >
              Close_Buffer
           </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1a1a1a] flex justify-between items-center">
           <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-[#00ff41] animate-pulse" />
              <div className="w-1.5 h-1.5 bg-[#00ff41] animate-pulse delay-75" />
           </div>
           <p className="font-mono text-[8px] text-[#4a5568] uppercase">ID::UPLINK_SECURE_NODE_0x1</p>
        </div>
      </div>
    </div>
  );
}
