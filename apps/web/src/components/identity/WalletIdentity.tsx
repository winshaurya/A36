'use client';

import React, { useState } from 'react';
import { formatAddress, getExplorerUrl } from '@/lib/blockchain';
import { Copy, Check, ExternalLink, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WalletIdentityProps {
  address: `0x${string}` | string;
  chainId?: number;
  className?: string;
  showCopy?: boolean;
  showExplorer?: boolean;
}

export function WalletIdentity({
  address,
  chainId = 43113,
  className,
  showCopy = true,
  showExplorer = true,
}: WalletIdentityProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const explorerUrl = getExplorerUrl(chainId, 'address', address);

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-origin-elevated border border-origin-border text-xs font-mono text-origin-muted',
        className
      )}
    >
      <Wallet className="w-3 h-3 text-origin-accent" />
      <span className="text-origin-text">{formatAddress(address)}</span>

      {showCopy && (
        <button
          type="button"
          onClick={handleCopy}
          className="p-0.5 hover:text-origin-text transition-colors"
          title="Copy full address"
        >
          {copied ? (
            <Check className="w-3 h-3 text-emerald-400" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </button>
      )}

      {showExplorer && (
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-0.5 hover:text-origin-text transition-colors"
          title="View on SnowTrace Explorer"
        >
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}
