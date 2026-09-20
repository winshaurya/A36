'use client';

import React from 'react';
import { ProvenanceStatus } from '@/lib/shared';
import { BRAND_CONFIG } from '@/lib/shared';
import { ShieldCheck, GitFork, AlertCircle, Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface ProvenanceBadgeProps {
  status?: ProvenanceStatus;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export function ProvenanceBadge({
  status = 'UNREGISTERED',
  onClick,
  className,
  size = 'md',
  interactive = true,
}: ProvenanceBadgeProps) {
  const getBadgeConfig = () => {
    switch (status) {
      case 'REGISTERED_FIRST':
        return {
          icon: ShieldCheck,
          text: BRAND_CONFIG.statusLabels.REGISTERED_FIRST,
          bgClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20',
          dotClass: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
        };
      case 'EARLIER_FOUND':
        return {
          icon: AlertCircle,
          text: BRAND_CONFIG.statusLabels.EARLIER_FOUND,
          bgClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20',
          dotClass: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
        };
      case 'REMIX':
        return {
          icon: GitFork,
          text: BRAND_CONFIG.statusLabels.REMIX,
          bgClass: 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20',
          dotClass: 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.6)]',
        };
      case 'REPOST':
        return {
          icon: CheckCircle2,
          text: BRAND_CONFIG.statusLabels.REPOST,
          bgClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20',
          dotClass: 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]',
        };
      case 'REGISTERING':
        return {
          icon: Sparkles,
          text: BRAND_CONFIG.statusLabels.REGISTERING,
          bgClass: 'bg-origin-accent/15 text-origin-accent hover:bg-origin-accent/25 border-origin-accent/40',
          dotClass: 'bg-origin-accent animate-ping',
        };
      default:
        return {
          icon: Clock,
          text: BRAND_CONFIG.statusLabels.UNREGISTERED,
          bgClass: 'bg-origin-elevated text-origin-muted border-origin-border hover:text-origin-text',
          dotClass: 'bg-origin-muted',
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5',
  };

  return (
    <motion.button
      type="button"
      whileHover={interactive ? { scale: 1.02 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      disabled={!interactive || !onClick}
      className={cn(
        'inline-flex items-center font-medium rounded-full border transition-colors cursor-pointer backdrop-blur-sm',
        sizeClasses[size],
        config.bgClass,
        !interactive && 'cursor-default pointer-events-none',
        className
      )}
      title={`${config.text} - Click to view Avalanche Provenance Receipt`}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full inline-block shrink-0', config.dotClass)} />
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span className="truncate">{config.text}</span>
    </motion.button>
  );
}
