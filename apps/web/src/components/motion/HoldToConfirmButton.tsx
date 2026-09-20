'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HoldToConfirmButtonProps {
  onConfirm: () => void | Promise<void>;
  label?: string;
  confirmingLabel?: string;
  completedLabel?: string;
  durationMs?: number;
  className?: string;
  disabled?: boolean;
}

export function HoldToConfirmButton({
  onConfirm,
  label = 'Hold to Register on Avalanche',
  confirmingLabel = 'Anchoring on Fuji C-Chain...',
  completedLabel = 'First Registered!',
  durationMs = 1200,
  className,
  disabled = false,
}: HoldToConfirmButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    if (disabled || isCompleted || isLoading) return;
    setIsHolding(true);

    timerRef.current = setTimeout(async () => {
      setIsHolding(false);
      setIsLoading(true);

      try {
        await onConfirm();
        setIsCompleted(true);

        // Safe client-side dynamic confetti
        if (typeof window !== 'undefined') {
          import('canvas-confetti').then((confettiModule) => {
            const confetti = confettiModule.default || confettiModule;
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.8 },
              colors: ['#E84142', '#10B981', '#F59E0B'],
            });
          });
        }
      } catch (err) {
        console.error('Registration failed:', err);
      } finally {
        setIsLoading(false);
      }
    }, durationMs);
  };

  const cancelHold = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsHolding(false);
  };

  return (
    <button
      type="button"
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      disabled={disabled || isLoading || isCompleted}
      className={cn(
        'relative overflow-hidden group select-none px-6 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-3',
        isCompleted
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
          : 'bg-origin-accent hover:bg-origin-accentHover text-white shadow-glow',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {/* Background Radial Fill Animation on Hold */}
      {isHolding && (
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: durationMs / 1000, ease: 'linear' }}
          className="absolute inset-0 bg-white/25 pointer-events-none"
        />
      )}

      {/* SVG Circular Path Progress Icon */}
      <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-white/20"
            strokeWidth="3.5"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {isHolding && (
            <motion.path
              className="text-white"
              strokeWidth="3.5"
              strokeDasharray="100, 100"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: durationMs / 1000, ease: 'linear' }}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          )}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : isCompleted ? (
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
        </div>
      </div>

      <span className="relative z-10 font-mono text-xs tracking-tight">
        {isLoading
          ? confirmingLabel
          : isCompleted
          ? completedLabel
          : isHolding
          ? 'Keep holding...'
          : label}
      </span>
    </button>
  );
}
