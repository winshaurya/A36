'use client';

import React, { useState } from 'react';
import { MemePost } from '@origin/shared';
import { CreatorIdentity } from '../identity/CreatorIdentity';
import { ProvenanceBadge } from '../provenance/ProvenanceBadge';
import { ProvenanceReceipt } from '../provenance/ProvenanceReceipt';
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Share2,
  Bookmark,
  GitFork,
  ReceiptText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface MemeCardProps {
  post: MemePost;
  className?: string;
  onRemix?: (post: MemePost) => void;
}

export function MemeCard({ post, className, onRemix }: MemeCardProps) {
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(post.userVote || null);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const handleVote = (type: 'up' | 'down') => {
    if (userVote === type) {
      setUserVote(null);
      setUpvotes((prev) => (type === 'up' ? prev - 1 : prev + 1));
    } else {
      setUpvotes((prev) => {
        let delta = type === 'up' ? 1 : -1;
        if (userVote === 'up') delta -= 1;
        if (userVote === 'down') delta += 1;
        return prev + delta;
      });
      setUserVote(type);
    }
  };

  const getAspectRatioClass = () => {
    switch (post.media.aspectRatio) {
      case '1:1':
        return 'aspect-square';
      case '4:5':
        return 'aspect-[4/5]';
      case '16:9':
        return 'aspect-[16/9]';
      default:
        return 'aspect-auto max-h-[580px]';
    }
  };

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 25 }}
        className={cn(
          'w-full max-w-xl bg-origin-surface border border-origin-border rounded-xl overflow-hidden shadow-originCard transition-shadow hover:border-origin-borderSubtle/80',
          className
        )}
      >
        {/* Header: Author, Community & Provenance Badge */}
        <div className="p-4 flex items-center justify-between gap-3 border-b border-origin-borderSubtle">
          <CreatorIdentity author={post.author} size="md" />

          {post.provenance && (
            <ProvenanceBadge
              status={post.provenance.status}
              onClick={() => setIsReceiptOpen(true)}
            />
          )}
        </div>

        {/* Title & Caption */}
        <div className="px-4 pt-3 pb-2">
          <h2 className="text-sm font-semibold text-origin-text leading-snug">
            {post.title}
          </h2>
          {post.caption && (
            <p className="text-xs text-origin-muted mt-1 leading-relaxed">
              {post.caption}
            </p>
          )}
        </div>

        {/* Meme Media (Sacred Dominant Content) */}
        <div className="relative w-full bg-black/40 overflow-hidden flex items-center justify-center">
          <img
            src={post.media.url}
            alt={post.media.altText || post.title}
            className={cn('w-full object-contain', getAspectRatioClass())}
            loading="lazy"
          />

          {/* Quick Receipt Pill Overlay */}
          {post.provenance && (
            <button
              onClick={() => setIsReceiptOpen(true)}
              className="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 text-origin-text backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-mono flex items-center gap-1.5 border border-white/10 transition-transform active:scale-95"
            >
              <ReceiptText className="w-3 h-3 text-origin-accent" />
              Receipt
            </button>
          )}
        </div>

        {/* Actions Rail */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-origin-borderSubtle text-origin-muted">
          {/* Vote Controls */}
          <div className="flex items-center bg-origin-elevated border border-origin-border rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => handleVote('up')}
              className={cn(
                'p-1.5 rounded hover:text-emerald-400 transition-colors',
                userVote === 'up' && 'text-emerald-400 bg-emerald-500/15'
              )}
              aria-label="Upvote"
            >
              <ArrowBigUp className="w-4 h-4" />
            </button>
            <span
              className={cn(
                'text-xs font-semibold px-2 min-w-[28px] text-center font-mono',
                userVote === 'up' && 'text-emerald-400',
                userVote === 'down' && 'text-origin-accent'
              )}
            >
              {upvotes}
            </span>
            <button
              type="button"
              onClick={() => handleVote('down')}
              className={cn(
                'p-1.5 rounded hover:text-origin-accent transition-colors',
                userVote === 'down' && 'text-origin-accent bg-origin-accent/15'
              )}
              aria-label="Downvote"
            >
              <ArrowBigDown className="w-4 h-4" />
            </button>
          </div>

          {/* Social Interactions */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs">
            <button
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-origin-elevated hover:text-origin-text transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">{post.commentsCount}</span>
            </button>

            <button
              type="button"
              onClick={() => onRemix && onRemix(post)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-purple-500/10 hover:text-purple-400 transition-colors"
            >
              <GitFork className="w-4 h-4" />
              <span className="hidden sm:inline">Remix</span>
            </button>

            <button
              type="button"
              className="p-1.5 rounded-lg hover:bg-origin-elevated hover:text-origin-text transition-colors"
              aria-label="Share meme"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              className={cn(
                'p-1.5 rounded-lg hover:bg-origin-elevated hover:text-origin-text transition-colors',
                isSaved && 'text-origin-accent'
              )}
              aria-label="Bookmark"
            >
              <Bookmark className={cn('w-4 h-4', isSaved && 'fill-origin-accent')} />
            </button>
          </div>
        </div>
      </motion.article>

      {/* Modal Receipt Popup */}
      <AnimatePresence>
        {isReceiptOpen && post.provenance && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setIsReceiptOpen(false)}
            />
            <div className="relative z-10 w-full max-w-md">
              <ProvenanceReceipt
                record={post.provenance}
                memeTitle={post.title}
                isOpen={isReceiptOpen}
                onClose={() => setIsReceiptOpen(false)}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
