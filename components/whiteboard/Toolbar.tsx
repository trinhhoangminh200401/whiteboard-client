'use client';

import { 
  Square, 
  Circle, 
  Minus, 
  Type, 
  MousePointer2, 
  Pencil, 
  Eraser, 
  Undo2, 
  Trash2, 
  Download,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWhiteboardStore } from '@/lib/store/useWhiteboardStore';

const TOOLS = [
  { id: 'select', icon: <MousePointer2 size={20} />, label: 'Selection' },
  { id: 'pencil', icon: <Pencil size={20} />, label: 'Pencil' },
  { id: 'rect', icon: <Square size={20} />, label: 'Rectangle' },
  { id: 'circle', icon: <Circle size={20} />, label: 'Ellipse' },
  { id: 'line', icon: <Minus size={20} />, label: 'Connector' },
  { id: 'text', icon: <Type size={20} />, label: 'Text' },
  { id: 'eraser', icon: <Eraser size={20} />, label: 'Eraser' },
];

const COLORS = ['#0F172A', '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

export default function Toolbar() {
  const { 
    activeTool, 
    setTool, 
    strokeColor, 
    setStrokeColor, 
    strokeWidth, 
    setStrokeWidth,
    undo,
    clear,
    exportImage
  } = useWhiteboardStore();

  return (
    <div className="flex flex-col gap-4 animate-in slide-in-from-left-4 duration-500">
      {/* Main Tool Rack */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-1.5 flex flex-col gap-1">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setTool(tool.id)}
            title={tool.label}
            className={cn(
              'w-10 h-10 flex items-center justify-center rounded-xl transition-all relative group',
              activeTool === tool.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
            )}
          >
            {tool.icon}
            <div className="absolute left-14 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none z-50">
               {tool.label}
            </div>
          </button>
        ))}
        
        <div className="h-px bg-slate-100 mx-2 my-1" />
        
        <button
          onClick={undo}
          className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
          title="Undo"
        >
          <Undo2 size={18} />
        </button>
      </div>

      {/* Style Matrix Rack */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-3 flex flex-col gap-5">
        {/* Simplified Color Select */}
        <div className="grid grid-cols-2 gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setStrokeColor(color)}
              className={cn(
                'w-5 h-5 rounded-md transition-all border-2',
                strokeColor === color 
                  ? 'border-indigo-600 scale-110' 
                  : 'border-transparent hover:scale-105'
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="h-px bg-slate-100" />

        {/* Technical Thickness Brushes */}
        <div className="flex flex-col gap-1.5">
            {[2, 4, 8].map(size => (
               <button
                 key={size}
                 onClick={() => setStrokeWidth(size)}
                 className={cn(
                   "w-full h-8 rounded-lg text-[10px] font-black uppercase transition-all flex items-center justify-center",
                   strokeWidth === size 
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" 
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                 )}
               >
                 {size}pt
               </button>
            ))}
        </div>
      </div>

      {/* Export / Destructive Rack */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-1.5 flex flex-col gap-1">
        <button
          onClick={exportImage}
          className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
          title="Export as Image"
        >
          <Download size={18} />
        </button>
        <button
          onClick={clear}
          className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
          title="Clear Buffer"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
