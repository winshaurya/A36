'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Anchor, Receipt, ArrowRight } from 'lucide-react';

export function ProtocolMechanics() {
  const steps = [
    {
      num: '01',
      icon: Cpu,
      title: 'Media Fingerprinting',
      subtitle: 'Client-Side Normalization',
      desc: 'Raw image dimensions and bytes are normalized on-device. Both a cryptographic Keccak-256 hash and a perceptual matrix hash are computed.',
      badge: 'Zero Server Leaks',
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    },
    {
      num: '02',
      icon: Anchor,
      title: 'Avalanche C-Chain Anchor',
      subtitle: 'Sub-Second Finality',
      desc: 'The content hash is anchored to the ProvenanceRegistry smart contract at Chain ID 43113. If you are first, your wallet address is permanently recorded.',
      badge: 'Immutable Block Order',
      color: 'text-origin-accent border-origin-accent/30 bg-origin-accent/10',
    },
    {
      num: '03',
      icon: Receipt,
      title: 'Cryptographic Receipt',
      subtitle: 'SnowTrace Verifiable',
      desc: 'An immutable digital receipt is generated with block number, timestamp, and SnowTrace explorer proof. Reposts link back to your root receipt.',
      badge: 'Permanent Provenance',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
  ];

  return (
    <section className="py-20 px-4 border-t border-origin-border bg-origin-base relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-origin-elevated border border-origin-border text-xs font-mono text-origin-muted mb-3">
            <span>Protocol Architecture</span>
          </div>
          <h2 className="text-3xl font-bold text-origin-text tracking-tight sm:text-4xl">
            How Meme Provenance Works
          </h2>
          <p className="text-sm text-origin-muted mt-2">
            No bulky file storage on-chain. The smart contract acts as an immutable chronological anchor for cryptographic receipts.
          </p>
        </div>

        {/* 3 Steps Grid with Kinetic Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative bg-origin-surface border border-origin-border rounded-2xl p-6 shadow-originCard flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-origin-muted/40">
                      {step.num}
                    </span>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${step.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="inline-block text-[11px] font-mono text-origin-muted uppercase tracking-wider mb-1">
                    {step.subtitle}
                  </div>
                  <h3 className="text-lg font-bold text-origin-text mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-origin-muted leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-origin-borderSubtle flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-origin-text">
                    {step.badge}
                  </span>
                  {idx < 2 && (
                    <ArrowRight className="hidden md:block w-4 h-4 text-origin-muted" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
