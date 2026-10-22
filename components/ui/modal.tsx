'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ open, onClose, title, children, className }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-xl animate-in fade-in duration-500" />

      {/* Panel */}
      <div
        className={cn(
          'relative z-10 w-full max-w-lg rounded-[2.5rem] glass-panel p-10 shadow-2xl shadow-black/80',
          'animate-in fade-in zoom-in-95 slide-in-from-bottom-10 duration-500 var(--ease-premium)',
          className
        )}
      >
        {/* Subtle top light highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {title && <h2 className="text-2xl font-black text-white tracking-tight">{title}</h2>}
          <button
            onClick={onClose}
            className="ml-auto p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
