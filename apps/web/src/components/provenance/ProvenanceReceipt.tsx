'use client';

import React, { useState } from 'react';
import { ProvenanceRecord, BRAND_CONFIG } from '@/lib/shared';
import { formatAddress, formatTxHash, getExplorerUrl } from '@/lib/blockchain';
import { ShieldCheck, Copy, Check, ExternalLink, Hash, Clock, Box, Layers, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface ProvenanceReceiptProps {
  record?: ProvenanceRecord;
  memeTitle?: string;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export function ProvenanceReceipt({
  record,
  memeTitle = 'Meme Artifact',
  isOpen = true,
  onClose,
  className,
}: ProvenanceReceiptProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!record) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const formattedDate = new Date(record.registrationTimestamp * 1000).toUTCString();
  const explorerTxUrl = getExplorerUrl(record.chainId, 'tx', record.transactionHash);
  const explorerAddressUrl = getExplorerUrl(record.chainId, 'address', record.registeredBy);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className={cn(
            'relative w-full max-w-md bg-origin-surface border border-origin-border rounded-xl p-6 shadow-originReceipt text-origin-text overflow-hidden',
            className
          )}
        >
          {/* Top Receipt Notch Decorator */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-origin-accent via-emerald-400 to-origin-accent" />
          
          {/* Close button if modal */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-origin-muted hover:text-origin-text hover:bg-origin-elevated transition-colors"
              aria-label="Close receipt"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Header */}
          <div className="flex items-center gap-3 border-b border-origin-border pb-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono tracking-wider text-origin-muted uppercase">
                {BRAND_CONFIG.name} PROTOCOL RECEIPT
              </div>
              <h3 className="text-sm font-semibold text-origin-text">
                Avalanche Fuji C-Chain (43113)
              </h3>
            </div>
          </div>

          {/* Artifact Title */}
          <div className="mb-4">
            <div className="text-[11px] text-origin-muted mb-1">Target Artifact</div>
            <div className="text-sm font-medium text-origin-text line-clamp-1">
              {memeTitle}
            </div>
          </div>

          {/* Key-Value Technical Details */}
          <div className="space-y-3 font-mono text-xs border-y border-origin-borderSubtle py-4 mb-4">
            {/* Fingerprint */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-origin-muted mb-1 font-sans">
                <span className="flex items-center gap-1.5">
                  <Hash className="w-3 h-3 text-origin-accent" /> Content Fingerprint
                </span>
                <button
                  onClick={() => handleCopy(record.fingerprint, 'fp')}
                  className="flex items-center gap-1 text-[10px] text-origin-muted hover:text-origin-text"
                >
                  {copiedKey === 'fp' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'fp' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="bg-origin-base border border-origin-border rounded px-2.5 py-1.5 text-[11px] text-origin-text break-all">
                {record.fingerprint}
              </div>
            </div>

            {/* Registrant */}
            <div className="flex items-center justify-between">
              <span className="text-origin-muted font-sans text-xs">First Registrant:</span>
              <a
                href={explorerAddressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-400 hover:underline"
              >
                {formatAddress(record.registeredBy, 5)}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Block & Timestamp */}
            <div className="flex items-center justify-between">
              <span className="text-origin-muted font-sans text-xs flex items-center gap-1">
                <Box className="w-3 h-3" /> Block Number:
              </span>
              <span className="text-origin-text">#{record.blockNumber.toString()}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-origin-muted font-sans text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" /> Recorded At:
              </span>
              <span className="text-origin-text text-[11px]">{formattedDate}</span>
            </div>

            {/* Transaction Hash */}
            <div className="flex items-center justify-between">
              <span className="text-origin-muted font-sans text-xs flex items-center gap-1">
                <Layers className="w-3 h-3" /> Transaction:
              </span>
              <a
                href={explorerTxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-origin-accent hover:underline"
              >
                {formatTxHash(record.transactionHash, 5)}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Footer Receipt Summary */}
          <div className="flex items-center justify-between text-[11px] text-origin-muted font-sans">
            <span>Protocol v{record.protocolVersion}</span>
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Immutable On-Chain Record
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
