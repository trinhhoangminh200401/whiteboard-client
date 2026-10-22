'use client';

import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import rough from 'roughjs';
import { useWhiteboardStore } from '@/lib/store/useWhiteboardStore';
import { log } from 'console';

interface Props {
  id: string;
}

export default function Whiteboard({ id }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { activeTool, strokeColor, strokeWidth, elements, addElement, undo } = useWhiteboardStore();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentElement, setCurrentElement] = useState<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;


    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener('resize', resize);
    resize();

    return () => window.removeEventListener('resize', resize);
  }, [elements]);

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const rc = rough.canvas(canvas);

    elements.forEach((el: any) => {
      drawElement(rc, el);
    });

    if (currentElement) {
      drawElement(rc, currentElement);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'z') {
        event.preventDefault();
        undo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [undo])

  const stopDrawing = () => {
    if (currentElement) {
      addElement(currentElement);
    }
    setIsDrawing(false);
    setCurrentElement(null);
  }

  const drawElement = (rc: any, el: any) => {
    const options = {
      stroke: el.color,
      strokeWidth: el.width,
      roughness: 0.1, // Subtle "Pro" roughness
      bowing: 1,
    };

    if (el.type === 'pencil') {
      rc.linearPath(el.points, options);
    } else if (el.type === 'rect') {
      rc.rectangle(el.x, el.y, el.width_rect, el.height_rect, options);
    } else if (el.type === 'circle') {
      rc.ellipse(el.x + el.width_rect / 2, el.y + el.height_rect / 2, el.width_rect, el.height_rect, options);
    } else if (el.type === 'line') {
      rc.line(el.x1, el.y1, el.x2, el.y2, options);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const { clientX, clientY } = e;
    const rect = canvasRef.current?.getBoundingClientRect();
    const x = clientX - (rect?.left || 0);
    const y = clientY - (rect?.top || 0);

    if (activeTool === 'pencil') {
      setCurrentElement({
        type: 'pencil',
        points: [[x, y]],
        color: strokeColor,
        width: strokeWidth
      });
    } else {
      setCurrentElement({
        type: activeTool,
        x: x,
        y: y,
        x1: x,
        y1: y,
        x2: x,
        y2: y,
        width_rect: 0,
        height_rect: 0,
        color: strokeColor,
        width: strokeWidth
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const { clientX, clientY } = e;
    const rect = canvasRef.current?.getBoundingClientRect();
    const x = clientX - (rect?.left || 0);
    const y = clientY - (rect?.top || 0);


    if (activeTool === 'pencil') {
      setCurrentElement((prev: any) => ({
        ...prev,
        points: [...prev.points, [x, y]]
      }));
    } else {
      setCurrentElement((prev: any) => ({
        ...prev,
        x2: x,
        y2: y,
        width_rect: x - prev.x,
        height_rect: y - prev.y
      }));
    }
    render();
  };

  // const handleMouseUp = () => {
  //   if (currentElement) {
  //     addElement(currentElement);
  //   }
  //   setIsDrawing(false);
  //   setCurrentElement(null);
  // };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}

      className="absolute inset-0 w-full h-full"
    />
  );
}
