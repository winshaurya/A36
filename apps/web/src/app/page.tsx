'use client';

import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { LiveNetworkTicker } from '@/components/landing/LiveNetworkTicker';
import { ProvenanceSimulator } from '@/components/landing/ProvenanceSimulator';
import { ProtocolMechanics } from '@/components/landing/ProtocolMechanics';
import { RemixVisualizer } from '@/components/landing/RemixVisualizer';
import { GuestCtaBanner } from '@/components/landing/GuestCtaBanner';
import { FooterSpecs } from '@/components/landing/FooterSpecs';
import Link from 'next/link';
import { BRAND_CONFIG } from '@origin/shared';
import { Flame, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-origin-base text-origin-text flex flex-col selection:bg-origin-accent/30 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-origin-base/80 backdrop-blur-md border-b border-origin-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-origin-accent flex items-center justify-center text-white font-black text-sm shadow-glow">
              🔺
            </div>
            <div>
              <span className="font-black text-base tracking-tight text-origin-text">
                {BRAND_CONFIG.name}
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono text-origin-muted px-1.5 py-0.5 rounded bg-origin-elevated border border-origin-border">
                Fuji C-Chain 43113
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="#simulator"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-origin-muted hover:text-origin-text px-3 py-1.5 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-origin-accent" />
              <span>Simulator</span>
            </a>

            <Link
              href="/feed"
              className="px-4 py-2 rounded-xl bg-origin-accent hover:bg-origin-accentHover text-white text-xs font-semibold flex items-center gap-2 shadow-glow transition-transform active:scale-95"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Launch App</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 7 Visual Zones */}
      <main className="flex-1">
        {/* Zone 1: Hero Zone */}
        <HeroSection />

        {/* Zone 2: Live Network Ticker */}
        <LiveNetworkTicker />

        {/* Zone 3: Interactive Provenance Simulator */}
        <ProvenanceSimulator />

        {/* Zone 4: Protocol Mechanics */}
        <ProtocolMechanics />

        {/* Zone 5: Remix & Lineage Visualizer */}
        <RemixVisualizer />

        {/* Zone 6: No-Barrier Guest CTA */}
        <GuestCtaBanner />
      </main>

      {/* Zone 7: Footer & Technical Specs */}
      <FooterSpecs />
    </div>
  );
}
