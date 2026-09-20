'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, LockOpen, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function GuestCtaBanner() {
  return (
    <section className="py-20 px-4 bg-origin-base relative overflow-hidden">
      <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-origin-surface to-origin-base border border-origin-border p-8 sm:p-12 text-center relative shadow-originReceipt overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-origin-accent/20 blur-[80px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6">
          <LockOpen className="w-3.5 h-3.5" />
          <span>No Login Required</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-origin-text tracking-tight mb-4 max-w-2xl mx-auto">
          Start Exploring Meme Provenance Right Now
        </h2>

        <p className="text-sm sm:text-base text-origin-muted max-w-xl mx-auto mb-8 leading-relaxed">
          Upvote, filter, inspect digital receipts, and follow cultural timelines without connecting a wallet. Connect only when you’re ready to anchor a new registration on Avalanche.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/feed"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-origin-accent hover:bg-origin-accentHover text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-glow transition-transform active:scale-95"
          >
            <span>Launch Social Feed</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://testnet.snowtrace.io/address/0x27ca712c47562555b7b726fc1c2716195bfc60f8"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-origin-elevated hover:bg-origin-overlay border border-origin-border text-origin-text text-sm font-mono flex items-center justify-center gap-2 transition-colors"
          >
            <span>Inspect Verified Contract</span>
          </a>
        </div>
      </div>
    </section>
  );
}
