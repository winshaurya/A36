'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { BRAND_CONFIG, MOCK_MEME_POSTS } from '@/lib/shared';
import { ShieldCheck, ArrowRight, Sparkles, Hash, Layers } from 'lucide-react';
import { ProvenanceBadge } from '../provenance/ProvenanceBadge';

export function HeroSection() {
  const heroPost = MOCK_MEME_POSTS[0];
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Parallax cursor tracking for hero card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24 px-4">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-origin-accent/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Bold Narrative Typography */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Protocol Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-origin-surface border border-origin-border text-xs font-mono text-origin-muted"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-origin-text font-semibold">Avalanche Fuji C-Chain</span>
            <span className="text-origin-border">|</span>
            <span>Sub-Second Finality</span>
          </motion.div>

          {/* Slogan & Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-origin-text leading-[1.08]"
          >
            THE INTERNET FORGETS.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-origin-accent via-rose-400 to-amber-400">
              THE CHAIN REMEMBERS.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-origin-muted max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Share memes socially while anchoring cryptographic fingerprints on Avalanche.
            Discover who registered first with immutable receipts. No crypto jargon, no mandatory wallet.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <Link
              href="/feed"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-origin-accent hover:bg-origin-accentHover text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-glow transition-transform active:scale-95"
            >
              <span>Explore Feed Without Wallet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#simulator"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-origin-surface hover:bg-origin-elevated border border-origin-border text-origin-text font-medium text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-origin-accent" />
              <span>Try Provenance Simulator</span>
            </a>
          </motion.div>

          {/* Social Proof Counters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-6 grid grid-cols-3 gap-4 border-t border-origin-border/60 max-w-md mx-auto lg:mx-0 text-left font-mono text-xs"
          >
            <div>
              <div className="text-lg font-bold text-origin-text font-sans">100%</div>
              <div className="text-origin-muted text-[11px]">Guest Browsing</div>
            </div>
            <div>
              <div className="text-lg font-bold text-emerald-400 font-sans">&lt;1.0s</div>
              <div className="text-origin-muted text-[11px]">Avalanche Finality</div>
            </div>
            <div>
              <div className="text-lg font-bold text-origin-accent font-sans">Verifiable</div>
              <div className="text-origin-muted text-[11px]">SnowTrace Receipts</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Interactive Parallax Hero Meme Card */}
        <div className="lg:col-span-5 flex justify-center perspective-[1000px]">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full max-w-sm bg-origin-surface border border-origin-border rounded-2xl p-4 shadow-originCard overflow-hidden backdrop-blur-md"
          >
            {/* Active Radar Scan Line Animation */}
            <motion.div
              animate={{ y: [0, 360, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent z-20 pointer-events-none shadow-[0_0_12px_rgba(52,211,153,0.8)]"
            />

            {/* Card Header */}
            <div className="flex items-center justify-between pb-3 border-b border-origin-borderSubtle">
              <div className="flex items-center gap-2">
                <img
                  src={heroPost.author.avatarUrl}
                  alt={heroPost.author.displayName}
                  className="w-7 h-7 rounded-full object-cover border border-origin-border"
                />
                <div>
                  <div className="text-xs font-semibold text-origin-text">
                    {heroPost.author.displayName}
                  </div>
                  <div className="text-[10px] text-origin-muted font-mono">
                    @{heroPost.author.username}
                  </div>
                </div>
              </div>
              <ProvenanceBadge status="REGISTERED_FIRST" />
            </div>

            {/* Media Viewport */}
            <div className="relative mt-3 rounded-xl overflow-hidden aspect-square bg-black/50">
              <img
                src={heroPost.media.url}
                alt={heroPost.title}
                className="w-full h-full object-cover"
              />

              {/* Verified Origin Watermark Pill */}
              <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ORIGIN #4892104</span>
              </div>
            </div>

            {/* Card Caption & Fingerprint Tag */}
            <div className="pt-3">
              <h3 className="text-xs font-semibold text-origin-text line-clamp-1">
                {heroPost.title}
              </h3>
              <div className="mt-2 p-2 rounded-lg bg-origin-base border border-origin-borderSubtle flex items-center justify-between text-[11px] font-mono text-origin-muted">
                <span className="flex items-center gap-1">
                  <Hash className="w-3 h-3 text-origin-accent" /> Keccak-256
                </span>
                <span className="text-origin-text text-[10px]">0x8f4d...def0</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
