'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  MOCK_MEME_POSTS,
  MOCK_COMMUNITIES,
  BRAND_CONFIG,
  MemePost,
} from '@/lib/shared';
import { MemeCard } from '@/components/feed/MemeCard';
import { OnChainFlameButton } from '@/components/motion/OnChainFlameButton';
import {
  ShieldCheck,
  Flame,
  Layers,
  Compass,
  Search,
  Bell,
  User,
  PlusSquare,
  Fuel,
  Activity,
  Receipt,
  ExternalLink,
  Sparkles,
  X,
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useProvenance } from '@/lib/providers/ProvenanceProvider';

const PRESET_MEMES = [
  {
    name: 'Avalanche Red Streak',
    url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Cryptographic Neon Matrix',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Surreal Pixel Reality',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Cyberpunk Aesthetic',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80',
  },
];

export default function FeedPage() {
  const [feedFilter, setFeedFilter] = useState<'firsts' | 'trending' | 'remixes'>('firsts');
  const [posts, setPosts] = useState<MemePost[]>(MOCK_MEME_POSTS);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  
  // New Meme Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState(PRESET_MEMES[0].url);
  const [imageHash, setImageHash] = useState<string>('0x8f4d92a10b3c5e789a12bc45def67890123456789abcdef0123456789abcdef0');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { registerMeme } = useProvenance();

  // Filter posts
  const displayedPosts = posts.filter((post) => {
    if (feedFilter === 'firsts') return post.provenance?.status === 'REGISTERED_FIRST';
    if (feedFilter === 'remixes') return post.provenance?.status === 'REMIX';
    return true;
  });

  // Calculate real SHA-256 hash from image ArrayBuffer
  const computeFileHash = async (file: File) => {
    try {
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = '0x' + hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      setImageHash(hashHex);
    } catch (err) {
      console.error('Hash calculation error:', err);
    }
  };

  // Handle local image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewMediaUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      computeFileHash(file);
    }
  };

  // Handle Drag & Drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewMediaUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      computeFileHash(file);
    }
  };

  const handleSelectPreset = (url: string) => {
    setNewMediaUrl(url);
    const mockHash = `0x${Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}`;
    setImageHash(mockHash);
  };

  const handleRegisterNewMeme = async () => {
    const targetFingerprint = (imageHash.startsWith('0x') ? imageHash : `0x${imageHash}`) as `0x${string}`;

    const res = await registerMeme(targetFingerprint);

    const createdPost: MemePost = {
      id: `post_origin_${Date.now()}`,
      title: newTitle || 'Newly Posted Avalanche Meme',
      caption: newCaption || 'Anchored on Avalanche C-Chain with sub-second receipt.',
      media: {
        url: newMediaUrl,
        aspectRatio: '1:1',
        width: 800,
        height: 800,
        mimeType: 'image/jpeg',
      },
      author: {
        id: 'u_guest_wallet',
        username: 'fuji_pioneer',
        displayName: 'Fuji Pioneer 🔺',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        walletAddress: '0x71C39B22C4e7a8920194B48924bcf34199018B29',
        joinedAt: Date.now(),
      },
      community: MOCK_COMMUNITIES[0],
      createdAt: Date.now(),
      upvotes: 1,
      downvotes: 0,
      userVote: 'up',
      commentsCount: 0,
      sharesCount: 1,
      remixesCount: 0,
      tags: ['avalanche', 'first', 'origin'],
      fingerprint: {
        hash: targetFingerprint,
        algorithm: 'keccak256',
      },
      provenance: res.record,
    };

    setPosts([createdPost, ...posts]);
    setTimeout(() => {
      setIsRegisterModalOpen(false);
      setNewTitle('');
      setNewCaption('');
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-origin-base text-origin-text flex justify-center selection:bg-origin-accent/30 selection:text-white">
      {/* 3-Column Desktop Shell */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6 px-4 py-6">
        {/* ======================================================== */}
        {/* Left Navigation Rail (Fixed Desktop 3-Cols) */}
        {/* ======================================================== */}
        <aside className="hidden md:flex md:col-span-3 flex-col justify-between sticky top-6 h-[calc(100vh-3rem)]">
          <div className="space-y-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 px-2 group">
              <div className="w-9 h-9 rounded-xl bg-origin-accent flex items-center justify-center text-white font-black text-base shadow-glow group-hover:scale-105 transition-transform">
                🔺
              </div>
              <div>
                <span className="font-black text-lg tracking-tight text-origin-text block">
                  {BRAND_CONFIG.name}
                </span>
                <span className="text-[10px] font-mono text-origin-muted block -mt-1">
                  Meme Provenance
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="space-y-1.5 font-medium text-sm">
              <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-origin-surface border border-origin-border text-origin-accent">
                <Flame className="w-4 h-4" />
                <span>Feed Stream</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-origin-muted hover:text-origin-text hover:bg-origin-elevated transition-colors">
                <Compass className="w-4 h-4" />
                <span>Explore</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-origin-muted hover:text-origin-text hover:bg-origin-elevated transition-colors">
                <Layers className="w-4 h-4" />
                <span>Communities</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-origin-muted hover:text-origin-text hover:bg-origin-elevated transition-colors">
                <Search className="w-4 h-4" />
                <span>Search Receipts</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-origin-muted hover:text-origin-text hover:bg-origin-elevated transition-colors">
                <Bell className="w-4 h-4" />
                <span>Receipt Alerts</span>
              </button>
            </nav>

            {/* Post Meme on Chain CTA */}
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-origin-accent via-rose-500 to-origin-accent hover:opacity-90 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow transition-all active:scale-95 uppercase tracking-wider"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Post Meme on Chain</span>
            </button>
          </div>

          {/* User / Guest Status */}
          <div className="p-3.5 rounded-xl bg-origin-surface border border-origin-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-origin-text">Guest Mode</div>
                <div className="text-[10px] font-mono text-emerald-400">Zero-auth active</div>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </aside>

        {/* ======================================================== */}
        {/* Main Feed Column (Center Max-Width 640px) */}
        {/* ======================================================== */}
        <main className="md:col-span-6 space-y-6 pb-24 md:pb-12 max-w-xl mx-auto w-full">
          {/* Top Sticky Filter Bar */}
          <div className="sticky top-0 z-30 bg-origin-base/90 backdrop-blur-md pb-2 pt-1 border-b border-origin-border flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-origin-surface p-1 rounded-xl border border-origin-border text-xs font-medium">
              <button
                onClick={() => setFeedFilter('firsts')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  feedFilter === 'firsts'
                    ? 'bg-origin-elevated text-emerald-400 font-semibold border border-origin-borderSubtle'
                    : 'text-origin-muted hover:text-origin-text'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Firsts</span>
              </button>

              <button
                onClick={() => setFeedFilter('trending')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  feedFilter === 'trending'
                    ? 'bg-origin-elevated text-origin-text font-semibold border border-origin-borderSubtle'
                    : 'text-origin-muted hover:text-origin-text'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-origin-accent" />
                <span>Trending</span>
              </button>

              <button
                onClick={() => setFeedFilter('remixes')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  feedFilter === 'remixes'
                    ? 'bg-origin-elevated text-purple-400 font-semibold border border-origin-borderSubtle'
                    : 'text-origin-muted hover:text-origin-text'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Remixes</span>
              </button>
            </div>

            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="md:hidden p-2 rounded-xl bg-origin-accent text-white"
              aria-label="Post Meme on Chain"
            >
              <PlusSquare className="w-4 h-4" />
            </button>
          </div>

          {/* Posts Stream */}
          <div className="space-y-6">
            {displayedPosts.map((post) => (
              <MemeCard key={post.id} post={post} />
            ))}
          </div>
        </main>

        {/* ======================================================== */}
        {/* Right Context Panel (Fixed 320px Desktop) */}
        {/* ======================================================== */}
        <aside className="hidden lg:flex lg:col-span-3 flex-col space-y-6 sticky top-6 h-[calc(100vh-3rem)]">
          {/* Live Avalanche Gas Ticker */}
          <div className="p-4 rounded-2xl bg-origin-surface border border-origin-border shadow-sm">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-origin-muted">
                <Fuel className="w-3.5 h-3.5 text-origin-accent" /> Avalanche C-Chain Gas
              </span>
              <span className="text-emerald-400 font-semibold">25.4 nAVAX</span>
            </div>
            <div className="p-2.5 rounded-xl bg-origin-base border border-origin-borderSubtle flex items-center justify-between text-[11px] font-mono">
              <span className="text-origin-muted">Block Time:</span>
              <span className="text-origin-text">~0.8s (Sub-Second)</span>
            </div>
          </div>

          {/* Verified Fuji Contract Box */}
          <div className="p-4 rounded-2xl bg-origin-surface border border-origin-border space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-origin-muted">
              Active Smart Contract
            </div>
            <div className="text-xs font-semibold text-origin-text">
              ProvenanceRegistry.sol
            </div>
            <div className="text-[11px] font-mono text-origin-muted break-all bg-origin-base p-2 rounded-lg border border-origin-borderSubtle">
              0x27ca712c47562555b7b726fc1c2716195bfc60f8
            </div>
            <a
              href="https://testnet.snowtrace.io/address/0x27ca712c47562555b7b726fc1c2716195bfc60f8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-mono hover:underline pt-1"
            >
              <span>View On SnowTrace</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Trending Communities */}
          <div className="p-4 rounded-2xl bg-origin-surface border border-origin-border space-y-3">
            <div className="text-xs font-semibold text-origin-text">
              Trending Communities
            </div>
            <div className="space-y-2">
              {MOCK_COMMUNITIES.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-origin-elevated transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={c.avatarUrl}
                      alt={c.name}
                      className="w-6 h-6 rounded-md object-cover"
                    />
                    <div>
                      <div className="text-xs font-medium text-origin-text">{c.name}</div>
                      <div className="text-[10px] text-origin-muted">
                        {c.memberCount.toLocaleString()} members
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-origin-muted">+{c.postCount}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ======================================================== */}
      {/* Mobile Navigation Dock (Fixed Bottom) */}
      {/* ======================================================== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-origin-base/95 backdrop-blur-lg border-t border-origin-border flex items-center justify-around z-40 text-origin-muted">
        <Link href="/feed" className="flex flex-col items-center gap-1 text-origin-accent">
          <Flame className="w-5 h-5" />
          <span className="text-[10px] font-medium">Feed</span>
        </Link>
        <button className="flex flex-col items-center gap-1 hover:text-origin-text">
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-medium">Explore</span>
        </button>
        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="flex flex-col items-center gap-1 hover:text-origin-text"
        >
          <div className="w-9 h-9 rounded-full bg-origin-accent flex items-center justify-center text-white -mt-3 shadow-glow">
            <PlusSquare className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium">Post Meme</span>
        </button>
        <button className="flex flex-col items-center gap-1 hover:text-origin-text">
          <Receipt className="w-5 h-5" />
          <span className="text-[10px] font-medium">Receipts</span>
        </button>
        <button className="flex flex-col items-center gap-1 hover:text-origin-text">
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Guest</span>
        </button>
      </nav>

      {/* ======================================================== */}
      {/* Post Meme on Chain Modal */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isRegisterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0"
              onClick={() => setIsRegisterModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-lg bg-origin-surface border border-origin-border rounded-2xl p-6 shadow-originReceipt text-origin-text my-8"
            >
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-origin-muted hover:text-origin-text hover:bg-origin-elevated"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-origin-border">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-origin-accent to-amber-500 text-white flex items-center justify-center shadow-glow">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-origin-text">Post a Meme on Chain</h3>
                  <p className="text-xs font-mono text-origin-muted">
                    Anchors permanent receipt on Avalanche Fuji C-Chain
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                {/* 1. Image Upload / Drag & Drop Area */}
                <div>
                  <label className="block text-origin-muted mb-1.5 font-medium">
                    Upload Your Meme / Picture
                  </label>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                      isDragOver
                        ? 'border-origin-accent bg-origin-accent/10 scale-[1.01]'
                        : 'border-origin-border hover:border-origin-accent/60 bg-origin-base'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-origin-elevated border border-origin-border flex items-center justify-center text-origin-accent">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-semibold text-origin-text">Click to choose image</span>
                        <span className="text-origin-muted"> or drag & drop here</span>
                      </div>
                      <div className="text-[11px] text-origin-muted font-mono">
                        PNG, JPG, GIF, WEBP supported
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Choose from Presets */}
                <div>
                  <div className="text-[11px] text-origin-muted mb-1.5 font-medium">
                    Or select a template:
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {PRESET_MEMES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPreset(preset.url)}
                        className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-transform hover:scale-105 ${
                          newMediaUrl === preset.url
                            ? 'border-origin-accent shadow-[0_0_10px_rgba(232,65,66,0.5)]'
                            : 'border-origin-border opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover"
                        />
                        {newMediaUrl === preset.url && (
                          <div className="absolute top-1 right-1 bg-origin-accent text-white rounded-full p-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Live Image Preview & Cryptographic Fingerprint */}
                <div className="rounded-xl border border-origin-borderSubtle overflow-hidden aspect-video bg-black flex items-center justify-center relative shadow-inner">
                  <img
                    src={newMediaUrl}
                    alt="Meme Preview"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Hash Ready
                    </span>
                    <span className="text-origin-muted truncate max-w-[200px]">
                      {imageHash.slice(0, 10)}...{imageHash.slice(-8)}
                    </span>
                  </div>
                </div>

                {/* 4. Meme Title */}
                <div>
                  <label className="block text-origin-muted mb-1 font-medium">Meme Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. When the gas drops below 25 nAVAX"
                    className="w-full px-3 py-2.5 rounded-xl bg-origin-base border border-origin-border text-origin-text focus:outline-none focus:border-origin-accent"
                  />
                </div>

                {/* 5. Caption */}
                <div>
                  <label className="block text-origin-muted mb-1 font-medium">Caption (Optional)</label>
                  <input
                    type="text"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Add your punchline..."
                    className="w-full px-3 py-2.5 rounded-xl bg-origin-base border border-origin-border text-origin-text focus:outline-none focus:border-origin-accent"
                  />
                </div>

                {/* 6. Epic On-Chain Flame & Lightning Button */}
                <div className="pt-2">
                  <OnChainFlameButton
                    onConfirm={handleRegisterNewMeme}
                    label="POST A NEW MEME ON CHAINNN!!!!!"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
