import { useEffect, useRef } from 'react';

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

interface DitherCanvasProps {
  opacity?: number;
}

export function DitherCanvas({ opacity = 0.24 }: DitherCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cell = 5;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let animId = 0;
    let time = 0;

    const pointer = { x: -9999, y: -9999, active: false };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
    };

    const onPointerMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      for (let r = 0; r < rows; r++) {
        const py = r * cell;
        const ny = r / Math.max(rows, 1);
        for (let c = 0; c < cols; c++) {
          const px = c * cell;
          const nx = c / Math.max(cols, 1);

          const waveA = Math.sin(nx * 5.2 + time * 0.55) * Math.cos(ny * 4.1 - time * 0.35);
          const waveB = Math.sin((nx + ny) * 6.5 - time * 0.4) * 0.5;
          let intensity = 0.14 + (waveA + waveB) * 0.12;

          if (pointer.active) {
            const dx = px - pointer.x;
            const dy = py - pointer.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 52000) {
              const boost = (1 - Math.sqrt(distSq) / 228) * 0.52;
              intensity += boost;
            }
          }

          const threshold = (BAYER_4X4[r & 3][c & 3] + 0.5) / 16;
          if (intensity > threshold) {
            const alpha = Math.min(0.85, (intensity - threshold) * 1.4);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
            ctx.fillRect(px, py, cell - 1, cell - 1);
          }
        }
      }

      if (!prefersReducedMotion) {
        time += 0.025;
        animId = window.requestAnimationFrame(renderFrame);
      }
    };

    resize();
    renderFrame();

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave, { passive: true });

    return () => {
      window.cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseleave', onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity }}
    />
  );
}
