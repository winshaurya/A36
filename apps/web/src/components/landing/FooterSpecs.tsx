'use client';

import React from 'react';
import { BRAND_CONFIG } from '@origin/shared';
import { ExternalLink, Github, Terminal, Shield, ArrowUpRight } from 'lucide-react';

export function FooterSpecs() {
  const contractAddress = '0x27ca712c47562555b7b726fc1c2716195bfc60f8';
  const snowtraceUrl = `https://testnet.snowtrace.io/address/${contractAddress}`;

  return (
    <footer className="border-t border-origin-border bg-origin-base py-12 px-4 text-origin-muted font-sans text-xs">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Col 1: Brand & Slogan */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-origin-accent flex items-center justify-center text-white text-xs font-black">
              🔺
            </div>
            <span className="font-bold text-sm text-origin-text">{BRAND_CONFIG.name}</span>
          </div>
          <p className="text-origin-muted max-w-sm text-xs leading-relaxed">
            {BRAND_CONFIG.tagline} A decentralized meme provenance protocol anchoring cryptographic receipts on Avalanche C-Chain.
          </p>
          <div className="text-[11px] text-origin-muted/80 max-w-md pt-2 border-t border-origin-borderSubtle">
            {BRAND_CONFIG.disclaimer}
          </div>
        </div>

        {/* Col 2: Technical Specifications */}
        <div className="space-y-2 font-mono text-[11px]">
          <div className="font-semibold text-origin-text uppercase tracking-wider font-sans mb-2">
            Protocol Specs
          </div>
          <div>Network: Avalanche Fuji (43113)</div>
          <div>Hashing: Keccak-256 / Perceptual</div>
          <div>Contract: <span className="text-origin-accent">ProvenanceRegistry</span></div>
          <div>Finality: Sub-second</div>
        </div>

        {/* Col 3: On-Chain & Repos */}
        <div className="space-y-2">
          <div className="font-semibold text-origin-text uppercase tracking-wider mb-2 font-mono text-[11px]">
            Verification & Code
          </div>
          <div>
            <a
              href={snowtraceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline font-mono text-[11px]"
            >
              <span>SnowTrace Verified Contract</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div>
            <a
              href="https://github.com/winshaurya/A36"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-origin-text hover:underline"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repository (A36)</span>
            </a>
          </div>
          <div>
            <span className="text-[11px] font-mono text-origin-muted">Contract: {contractAddress.slice(0, 10)}...{contractAddress.slice(-8)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-origin-borderSubtle flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <div>© 2026 {BRAND_CONFIG.name} Protocol. Built on Avalanche C-Chain.</div>
        <div className="flex items-center gap-4">
          <span>Privacy-Preserving</span>
          <span>•</span>
          <span>No Centralized Moderation of Hashes</span>
          <span>•</span>
          <span>Permanent History</span>
        </div>
      </div>
    </footer>
  );
}
