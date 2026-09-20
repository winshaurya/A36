'use client';

import React from 'react';
import { Author } from '@/lib/shared';
import { WalletIdentity } from './WalletIdentity';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CreatorIdentityProps {
  author: Author;
  showWallet?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CreatorIdentity({
  author,
  showWallet = false,
  className,
  size = 'md',
}: CreatorIdentityProps) {
  const avatarSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div
        className={cn(
          'relative rounded-full overflow-hidden bg-origin-elevated border border-origin-border shrink-0',
          avatarSizes[size]
        )}
      >
        <img
          src={author.avatarUrl}
          alt={author.displayName}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-xs text-origin-text truncate">
            {author.displayName}
          </span>
          <span className="text-[11px] text-origin-muted truncate">
            @{author.username}
          </span>
          {author.badge && (
            <span className="text-[10px] px-1.5 py-0.2 bg-origin-elevated border border-origin-border rounded text-origin-muted">
              {author.badge}
            </span>
          )}
        </div>

        {showWallet && author.walletAddress && (
          <div className="mt-1">
            <WalletIdentity address={author.walletAddress} />
          </div>
        )}
      </div>
    </div>
  );
}
