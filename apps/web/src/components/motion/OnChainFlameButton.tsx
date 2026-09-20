'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Flame, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnChainFlameButtonProps {
  onConfirm: () => void | Promise<void>;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function OnChainFlameButton({
  onConfirm,
  label = 'POST A NEW MEME ON CHAINNN!!!!!',
  className,
  disabled = false,
}: OnChainFlameButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [isFiring, setIsFiring] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    decay: number;
  }>>([]);

  // Native Canvas Flame & Lightning Particle System (Zero-dependency, 100% reliable)
  const spawnExplosion = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const colors = ['#E84142', '#FF5A5B', '#F59E0B', '#10B981', '#06B6D4', '#FFFFFF'];
    const centerX = width / 2;
    const centerY = height / 2 + 100;

    particlesRef.current = [];
    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      particlesRef.current.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.012,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      let alive = false;
      for (const p of particlesRef.current) {
        if (p.alpha > 0) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.25; // gravity
          p.alpha -= p.decay;

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      if (alive) {
        animationFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    render();
  };

  const startHold = () => {
    if (disabled || isFiring || isSuccess) return;
    setIsHolding(true);

    timerRef.current = setTimeout(async () => {
      setIsHolding(false);
      setIsFiring(true);

      try {
        await onConfirm();
        setIsSuccess(true);
        spawnExplosion();
      } catch (err) {
        console.error('On-chain post failed:', err);
      } finally {
        setIsFiring(false);
      }
    }, 1200);
  };

  const cancelHold = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsHolding(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <>
      {/* Fullscreen Canvas for Lightning Sparks & Explosions */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[100]"
      />

      <div className="relative group w-full select-none">
        {/* Animated Electric Lightning Border Glow */}
        <div
          className={cn(
            'absolute -inset-1 rounded-2xl opacity-75 blur-md transition-all duration-300 group-hover:opacity-100',
            isHolding
              ? 'bg-gradient-to-r from-amber-400 via-origin-accent to-cyan-400 animate-pulse'
              : 'bg-gradient-to-r from-origin-accent via-rose-500 to-amber-500'
          )}
        />

        {/* Shockwave Rings on Hold */}
        {isHolding && (
          <>
            <span className="absolute -inset-3 rounded-2xl border-2 border-origin-accent/60 animate-ping pointer-events-none" />
            <span className="absolute -inset-6 rounded-2xl border border-cyan-400/40 animate-ping pointer-events-none delay-150" />
          </>
        )}

        <button
          type="button"
          onMouseDown={startHold}
          onMouseUp={cancelHold}
          onMouseLeave={cancelHold}
          onTouchStart={startHold}
          onTouchEnd={cancelHold}
          disabled={disabled || isFiring}
          className={cn(
            'relative w-full overflow-hidden rounded-xl px-6 py-4 font-black tracking-wider text-sm transition-all flex items-center justify-center gap-3 active:scale-95 shadow-2xl',
            isSuccess
              ? 'bg-emerald-600 text-white border-2 border-emerald-400'
              : isHolding
              ? 'bg-gradient-to-r from-origin-accent via-amber-500 to-origin-accent text-white scale-[1.02]'
              : 'bg-gradient-to-r from-origin-accent to-rose-600 hover:from-rose-500 hover:to-origin-accent text-white border border-white/20',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          {/* Internal Progress Fill Bar */}
          {isHolding && (
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, ease: 'linear' }}
              className="absolute inset-0 bg-white/30 pointer-events-none"
            />
          )}

          {/* Icon System */}
          <div className="relative z-10 flex items-center gap-2">
            {isFiring ? (
              <Loader2 className="w-5 h-5 animate-spin text-amber-300" />
            ) : isSuccess ? (
              <ShieldCheck className="w-5 h-5 text-emerald-300 animate-bounce" />
            ) : (
              <div className="flex items-center">
                <Zap className={cn('w-5 h-5 text-amber-300', isHolding && 'animate-bounce')} />
                <Flame className={cn('w-5 h-5 text-yellow-200 -ml-1', isHolding && 'animate-pulse')} />
              </div>
            )}

            <span className="relative font-mono tracking-tight uppercase">
              {isFiring
                ? 'ANCHORING TO AVALANCHE FUJI...'
                : isSuccess
                ? 'POSTED & ANCHORED ON CHAIN!'
                : isHolding
                ? 'CHARGING ON-CHAIN LIGHTNING...'
                : label}
            </span>

            {!isFiring && !isSuccess && (
              <Zap className={cn('w-5 h-5 text-amber-300', isHolding && 'animate-bounce')} />
            )}
          </div>
        </button>
      </div>
    </>
  );
}
