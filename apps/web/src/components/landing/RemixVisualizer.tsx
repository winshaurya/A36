'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GitFork, ShieldCheck, CornerDownRight, ArrowRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RemixVisualizer() {
  const [selectedNode, setSelectedNode] = useState<string>('root');

  const nodes = [
    {
      id: 'root',
      title: 'Genesis Meme Anchor',
      author: '@satoshi_claus',
      timestamp: 'Block #4892104 • 2 days ago',
      type: 'ORIGIN_REGISTERED_FIRST',
      media: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
      badge: 'Root Provenance Receipt',
      color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
    },
    {
      id: 'branch_1',
      title: 'Dark Mode Aspect Ratio Remix',
      author: '@fuji_remixer',
      timestamp: 'Block #4893450 • 18 hours ago',
      type: 'REMIX_DERIVATIVE',
      media: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
      badge: 'Linked Parent: Genesis #4892104',
      color: 'border-purple-500/50 bg-purple-500/10 text-purple-400',
    },
    {
      id: 'branch_2',
      title: 'Viral Speed Caption Edition',
      author: '@meme_archivist',
      timestamp: 'Block #4894100 • 2 hours ago',
      type: 'VIRAL_REMIX',
      media: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop&q=80',
      badge: 'Linked Parent: Genesis #4892104',
      color: 'border-origin-accent/50 bg-origin-accent/10 text-origin-accent',
    },
  ];

  return (
    <section className="py-20 px-4 border-t border-origin-border bg-origin-surface/20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-origin-elevated border border-origin-border text-xs font-mono text-purple-400 mb-3">
            <GitFork className="w-3.5 h-3.5" />
            <span>Remix & Lineage Protocol</span>
          </div>
          <h2 className="text-3xl font-bold text-origin-text tracking-tight sm:text-4xl">
            Every Remix Knows Its Roots
          </h2>
          <p className="text-sm text-origin-muted mt-2">
            Culture thrives on iteration. When you remix an existing meme, the protocol records a cryptographic reference to the root origin receipt.
          </p>
        </div>

        {/* Tree Graph Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Root Origin Node */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-origin-muted flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Canonical Origin Record</span>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedNode('root')}
              className={cn(
                'p-5 rounded-2xl bg-origin-surface border transition-all cursor-pointer shadow-originCard',
                selectedNode === 'root'
                  ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                  : 'border-origin-border hover:border-emerald-500/40'
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  ORIGIN_REGISTERED_FIRST
                </span>
                <span className="text-xs font-mono text-origin-muted">#4892104</span>
              </div>

              <div className="flex gap-4 items-center">
                <img
                  src={nodes[0].media}
                  alt={nodes[0].title}
                  className="w-16 h-16 rounded-xl object-cover border border-origin-border shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold text-origin-text">{nodes[0].title}</h4>
                  <div className="text-xs text-origin-muted mt-0.5">{nodes[0].author}</div>
                  <div className="text-[11px] font-mono text-emerald-400 mt-1">
                    Receipt 0x9a3e...1234
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Kinetic Middle Branch Connector */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-origin-muted py-2">
            <div className="hidden lg:flex flex-col items-center gap-2 font-mono text-[11px]">
              <span>PROPAGATES</span>
              <ArrowRight className="w-5 h-5 text-origin-accent animate-pulse" />
            </div>
            <div className="lg:hidden flex items-center gap-2 font-mono text-[11px] my-2">
              <CornerDownRight className="w-4 h-4 text-origin-accent" />
              <span>DERIVATIVE REMIXES</span>
            </div>
          </div>

          {/* Child Remix Nodes */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-origin-muted flex items-center gap-1.5">
              <GitFork className="w-4 h-4 text-purple-400" />
              <span>Verified Offspring & Derivatives</span>
            </div>

            {nodes.slice(1).map((node) => (
              <motion.div
                key={node.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedNode(node.id)}
                className={cn(
                  'p-4 rounded-xl bg-origin-surface border transition-all cursor-pointer',
                  selectedNode === node.id
                    ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    : 'border-origin-border hover:border-purple-500/40'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    {node.badge}
                  </span>
                  <span className="text-[11px] font-mono text-origin-muted">{node.author}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <img
                    src={node.media}
                    alt={node.title}
                    className="w-12 h-12 rounded-lg object-cover border border-origin-border shrink-0"
                  />
                  <div>
                    <h5 className="text-xs font-semibold text-origin-text">{node.title}</h5>
                    <div className="text-[10px] font-mono text-origin-muted">{node.timestamp}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
