import { create } from 'zustand';
import type { ObjectType } from '@/types/object';

export type DrawingTool = 'select' | 'pen' | 'line' | 'rect' | 'circle' | 'text' | 'arrow' | 'eraser';

interface CanvasState {
  activeTool: DrawingTool;
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
  opacity: number;
  roughness: number;
  isDrawing: boolean;
  zoom: number;

  setTool: (tool: DrawingTool) => void;
  setStrokeColor: (color: string) => void;
  setFillColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  setOpacity: (opacity: number) => void;
  setRoughness: (roughness: number) => void;
  setIsDrawing: (drawing: boolean) => void;
  setZoom: (zoom: number) => void;
  resetDefaults: () => void;
}

const defaults = {
  activeTool: 'pen' as DrawingTool,
  strokeColor: '#1a1a2e',
  fillColor: 'transparent',
  strokeWidth: 2,
  opacity: 1,
  roughness: 1,
  isDrawing: false,
  zoom: 1,
};

export const useCanvasStore = create<CanvasState>((set) => ({
  ...defaults,

  setTool: (activeTool) => set({ activeTool }),
  setStrokeColor: (strokeColor) => set({ strokeColor }),
  setFillColor: (fillColor) => set({ fillColor }),
  setStrokeWidth: (strokeWidth) => set({ strokeWidth }),
  setOpacity: (opacity) => set({ opacity }),
  setRoughness: (roughness) => set({ roughness }),
  setIsDrawing: (isDrawing) => set({ isDrawing }),
  setZoom: (zoom) => set({ zoom }),
  resetDefaults: () => set(defaults),
}));
