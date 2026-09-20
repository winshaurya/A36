'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sliders, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProvenanceSimulator() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<'MATCH_FOUND' | null>('MATCH_FOUND');

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationResult('MATCH_FOUND');
    }, 800);
  };

  return (
    <section id="simulator" className="py-20 px-4 border-t border-origin-border bg-origin-surface/30">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-origin-elevated border border-origin-border text-xs font-mono text-origin-accent mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl font-bold text-origin-text tracking-tight sm:text-4xl">
            Compression Changes Pixels.{' '}
            <span className="text-origin-accent">The Protocol Finds the Origin.</span>
          </h2>
          <p className="text-sm text-origin-muted mt-2">
            Drag the comparison slider to see how crop, compression, and screenshot noise differ from the canonical on-chain registration timestamp.
          </p>
        </div>

        {/* Comparison Slider Box */}
        <div className="bg-origin-surface border border-origin-border rounded-2xl p-6 shadow-originCard max-w-4xl mx-auto">
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden select-none border border-origin-borderSubtle bg-black">
            {/* Left Image: Canonical First Registration */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
                alt="Canonical Origin"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>FIRST REGISTERED (Block #4892104)</span>
              </div>
            </div>

            {/* Right Image: Repost with noise & crop (Clipped by slider) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            >
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=10"
                alt="Lossy Recompressed Version"
                className="w-full h-full object-cover contrast-125 brightness-90 saturate-150 filter blur-[0.5px]"
              />
              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 text-amber-400 text-xs font-mono flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>RECOMPRESSED REPOST (Day 14)</span>
              </div>
            </div>

            {/* Slider Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.8)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shadow-lg">
                ⇄
              </div>
            </div>

            {/* Range Input Overlay */}
            <input
              type="range"
              min="5"
              max="95"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
              aria-label="Comparison slider"
            />
          </div>

          {/* Simulator Verification Output */}
          <div className="mt-6 p-4 rounded-xl bg-origin-base border border-origin-borderSubtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-origin-text">
                  Perceptual Hash Matched Root Provenance
                </div>
                <div className="text-[11px] font-mono text-origin-muted">
                  Normalized similarity: 99.4% • Origin: @satoshi_claus (Avalanche Fuji)
                </div>
              </div>
            </div>

            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="px-4 py-2 rounded-lg bg-origin-elevated hover:bg-origin-overlay border border-origin-border text-xs font-mono text-origin-text flex items-center gap-2 transition-colors active:scale-95 shrink-0"
            >
              <RefreshCw className={cn('w-3.5 h-3.5', isSimulating && 'animate-spin')} />
              <span>{isSimulating ? 'Simulating Scan...' : 'Re-verify Hash'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
