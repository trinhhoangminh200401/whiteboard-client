import { create } from 'zustand';

interface WhiteboardState {
  elements: any[];
  activeTool: string;
  strokeColor: string;
  strokeWidth: number;
  setTool: (tool: string) => void;
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  addElement: (element: any) => void;
  undo: () => void;
  clear: () => void;
  exportImage: () => void;
}

export const useWhiteboardStore = create<WhiteboardState>((set) => ({
  elements: [],
  activeTool: 'pencil',
  strokeColor: '#00FF41',
  strokeWidth: 2,

  setTool: (tool) => set({ activeTool: tool }),
  setStrokeColor: (color) => set({ strokeColor: color }),
  setStrokeWidth: (width) => set({ strokeWidth: width }),
  
  addElement: (element) => set((state) => ({ 
    elements: [...state.elements, element] 
  })),

  undo: () => set((state) => ({ 
    elements: state.elements.slice(0, -1) 
  })),

  clear: () => set({ elements: [] }),

  exportImage: () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'whiteboard-export.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  }
}));
