'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Activity, Box, Clock } from 'lucide-react';
import { formatAddress, formatTxHash } from '@origin/blockchain';

export function LiveNetworkTicker() {
  const [currentBlock, setCurrentBlock] = useState(4894210);

  useEffect(() => {
    // Simulate Avalanche sub-second block production interval
    const interval = setInterval(() => {
      setCurrentBlock((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const mockLiveEvents = [
    {
      id: 'e1',
      title: 'Doge on Fuji Peak',
      author: '0x71c3...8b29',
      tx: '0x9a3e...1234',
      status: 'FIRST_REGISTERED',
      time: '2s ago',
    },
    {
      id: 'e2',
      title: 'Sub-Second Finality Reaction',
      author: '0x9e44...4311',
      tx: '0x1f89...0abc',
      status: 'REMIX',
      time: '5s ago',
    },
    {
      id: 'e3',
      title: 'Ethereum Gas vs Avalanche Gas',
      author: '0x3a29...3a29',
      tx: '0x5567...ef12',
      status: 'FIRST_REGISTERED',
      time: '11s ago',
    },
    {
      id: 'e4',
      title: 'The Groupchat Archive',
      author: '0x12fc...67a0',
      tx: '0x88bb...9900',
      status: 'DUPLICATE_LINKED',
      time: '18s ago',
    },
  ];

  return (
    <section className="py-6 border-y border-origin-border bg-origin-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-6">
        {/* Left Live Indicator Badge */}
        <div className="flex items-center gap-3 shrink-0 bg-origin-base px-3.5 py-1.5 rounded-xl border border-origin-border">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold text-origin-text">
            Fuji C-Chain Live
          </span>
          <span className="text-origin-border">|</span>
          <span className="text-xs font-mono text-origin-muted flex items-center gap-1">
            <Box className="w-3.5 h-3.5 text-origin-accent" /> #{currentBlock}
          </span>
        </div>

        {/* Marquee Ticker */}
        <div className="relative w-full overflow-hidden mask-gradient-x">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
            className="flex items-center gap-4 whitespace-nowrap"
          >
            {[...mockLiveEvents, ...mockLiveEvents].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-origin-elevated border border-origin-borderSubtle text-xs font-mono text-origin-text shadow-sm"
              >
                <ShieldCheck
                  className={`w-3.5 h-3.5 ${
                    item.status === 'FIRST_REGISTERED'
                      ? 'text-emerald-400'
                      : 'text-purple-400'
                  }`}
                />
                <span className="font-sans font-medium">{item.title}</span>
                <span className="text-origin-muted">({item.author})</span>
                <span className="text-[11px] text-emerald-400/90 font-semibold">
                  {item.status === 'FIRST_REGISTERED' ? 'First' : 'Remix'}
                </span>
                <span className="text-[10px] text-origin-muted flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5" /> {item.time}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
