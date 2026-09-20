import { MemePost } from '../types/social';
import { ProvenanceTimelineNode } from '../types/provenance';

export const MOCK_COMMUNITIES = [
  {
    id: 'c_crypto_receipts',
    slug: 'crypto-receipts',
    name: 'Crypto Receipts',
    description: 'When the chain remembers what you deleted. Permanent on-chain receipts.',
    avatarUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=150&auto=format&fit=crop&q=80',
    memberCount: 42300,
    postCount: 1420,
    tags: ['receipts', 'avalanche', 'rekt', 'history'],
  },
  {
    id: 'c_pixel_philosophy',
    slug: 'pixel-philosophy',
    name: 'Pixel Philosophy',
    description: 'High-concept existential memes, surreal edits, and algorithmic satire.',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    memberCount: 28900,
    postCount: 930,
    tags: ['surreal', 'philosophy', 'art', 'remix'],
  },
  {
    id: 'c_avalanche_speed',
    slug: 'sub-second-memes',
    name: 'Sub-Second Memes',
    description: 'Speedrunning meme culture with sub-second finality on Avalanche.',
    avatarUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=150&auto=format&fit=crop&q=80',
    memberCount: 35100,
    postCount: 1105,
    tags: ['speed', 'fuji', 'avalanche', 'alpha'],
  },
];

export const MOCK_AUTHORS = {
  satoshi_claus: {
    id: 'u_satoshi',
    username: 'satoshi_claus',
    displayName: 'Satoshi Claus 🎅',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    walletAddress: '0x71C...8B29' as `0x${string}`,
    bio: 'Dropping receipts down your chimney since Genesis block.',
    badge: 'Genesis Registrant',
    joinedAt: 1700000000,
  },
  meme_archivist: {
    id: 'u_archivist',
    username: 'meme_archivist',
    displayName: 'The On-Chain Archivist',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    walletAddress: '0x3A2...91C4' as `0x${string}`,
    bio: 'Preserving internet artifacts before they get DMCA’d or lost to bitrot.',
    badge: 'Protocol Pioneer',
    joinedAt: 1702000000,
  },
  fuji_builder: {
    id: 'u_fuji',
    username: 'fuji_remixer',
    displayName: 'Fuji Remixer 🔺',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    walletAddress: '0x9E4...4311' as `0x${string}`,
    bio: 'Sub-second remixing on Avalanche C-Chain.',
    badge: 'Top Remixer',
    joinedAt: 1705000000,
  },
  anon_lurker: {
    id: 'u_anon',
    username: 'anon_poster_42',
    displayName: 'Anon #42',
    avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=120&auto=format&fit=crop&q=80',
    walletAddress: '0x12F...67A0' as `0x${string}`,
    bio: 'Just here for the receipts.',
    joinedAt: 1710000000,
  },
};

export const MOCK_MEME_POSTS: MemePost[] = [
  {
    id: 'post_origin_01',
    title: 'The moment you realize your deleted tweet was hashed on Avalanche',
    caption: 'Screenshots can be photoshopped. Keccak-256 on C-Chain at block 4,892,104 is eternal.',
    media: {
      url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      aspectRatio: '1:1',
      width: 800,
      height: 800,
      mimeType: 'image/jpeg',
      altText: 'Vibrant neon abstract representing cryptographic memory and time'
    },
    author: MOCK_AUTHORS.satoshi_claus,
    community: MOCK_COMMUNITIES[0],
    createdAt: Date.now() - 1000 * 60 * 42, // 42 mins ago
    upvotes: 3420,
    downvotes: 42,
    userVote: 'up',
    commentsCount: 184,
    sharesCount: 512,
    remixesCount: 14,
    isSaved: true,
    tags: ['receipts', 'first', 'avalanche'],
    fingerprint: {
      hash: '0x8f4d92a10b3c5e789a12bc45def67890123456789abcdef0123456789abcdef0',
      algorithm: 'keccak256',
      normalizedDimensions: { width: 800, height: 800 }
    },
    provenance: {
      fingerprint: '0x8f4d92a10b3c5e789a12bc45def67890123456789abcdef0123456789abcdef0',
      registeredBy: '0x71C39B22C4e7a8920194B48924bcf34199018B29',
      blockNumber: 4892104,
      chainId: 43113,
      transactionHash: '0x9a3e21bc7890123456789abcdef0123456789abcdef0123456789abcdef01234',
      registrationTimestamp: Math.floor((Date.now() - 1000 * 60 * 42) / 1000),
      status: 'REGISTERED_FIRST',
      relationship: 'FIRST_REGISTRATION',
      protocolVersion: 1
    }
  },
  {
    id: 'post_origin_02',
    title: 'POV: You tried to repost the top meme but ORIGIN flashed the original receipt',
    caption: 'Nice crop bro, but the perceptual fingerprint already matches Satoshi Claus registered 2 days ago.',
    media: {
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      aspectRatio: '4:5',
      width: 800,
      height: 1000,
      mimeType: 'image/jpeg',
      altText: 'Surreal geometric composition symbolizing detection and provenance'
    },
    author: MOCK_AUTHORS.fuji_builder,
    community: MOCK_COMMUNITIES[1],
    createdAt: Date.now() - 1000 * 60 * 18, // 18 mins ago
    upvotes: 1890,
    downvotes: 15,
    userVote: null,
    commentsCount: 67,
    sharesCount: 230,
    remixesCount: 5,
    tags: ['remix', 'receipts', 'culture'],
    fingerprint: {
      hash: '0x4c2b98a01f3e4d567890abcdef1234567890abcdef1234567890abcdef123456',
      algorithm: 'perceptual_v1',
      normalizedDimensions: { width: 800, height: 1000 }
    },
    provenance: {
      fingerprint: '0x4c2b98a01f3e4d567890abcdef1234567890abcdef1234567890abcdef123456',
      registeredBy: '0x9E4431109aBC81920194B48924bcf34199014311',
      blockNumber: 4893450,
      chainId: 43113,
      transactionHash: '0x1f89bc4567890abcdef1234567890abcdef1234567890abcdef1234567890abc',
      registrationTimestamp: Math.floor((Date.now() - 1000 * 60 * 18) / 1000),
      status: 'REMIX',
      relationship: 'REMIX',
      parentFingerprint: '0x8f4d92a10b3c5e789a12bc45def67890123456789abcdef0123456789abcdef0',
      remixNotes: 'Added 4:5 geometric framing and high-contrast palette',
      protocolVersion: 1
    }
  },
  {
    id: 'post_origin_03',
    title: 'Sub-second finality hits different when you beat the groupchat to the punch',
    caption: 'Submitted at 14:02:01.450 -> Confirmed at 14:02:02.100. Receipt in hand.',
    media: {
      url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80',
      aspectRatio: '16:9',
      width: 1200,
      height: 675,
      mimeType: 'image/jpeg',
      altText: 'High speed crimson light streak across dark digital grid'
    },
    author: MOCK_AUTHORS.meme_archivist,
    community: MOCK_COMMUNITIES[2],
    createdAt: Date.now() - 1000 * 60 * 120, // 2 hours ago
    upvotes: 4210,
    downvotes: 29,
    userVote: 'up',
    commentsCount: 290,
    sharesCount: 890,
    remixesCount: 31,
    tags: ['speed', 'fuji', 'origin'],
    fingerprint: {
      hash: '0x7e3a910bc4df5678901234567890abcdef1234567890abcdef1234567890abcd',
      algorithm: 'keccak256',
      normalizedDimensions: { width: 1200, height: 675 }
    },
    provenance: {
      fingerprint: '0x7e3a910bc4df5678901234567890abcdef1234567890abcdef1234567890abcd',
      registeredBy: '0x3A291C4B52039184B48924bcf341990191C43A29',
      blockNumber: 4890812,
      chainId: 43113,
      transactionHash: '0x5567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
      registrationTimestamp: Math.floor((Date.now() - 1000 * 60 * 120) / 1000),
      status: 'REGISTERED_FIRST',
      relationship: 'FIRST_REGISTRATION',
      protocolVersion: 1
    }
  }
];

export const MOCK_PROVENANCE_TIMELINE: Record<string, ProvenanceTimelineNode[]> = {
  '0x8f4d92a10b3c5e789a12bc45def67890123456789abcdef0123456789abcdef0': [
    {
      id: 'node_1',
      fingerprint: '0x8f4d92a10b3c5e789a12bc45def67890123456789abcdef0123456789abcdef0',
      registeredBy: '0x71C39B22C4e7a8920194B48924bcf34199018B29',
      authorUsername: 'satoshi_claus',
      authorDisplayName: 'Satoshi Claus 🎅',
      authorAvatarUrl: MOCK_AUTHORS.satoshi_claus.avatarUrl,
      timestamp: Math.floor((Date.now() - 1000 * 60 * 42) / 1000),
      transactionHash: '0x9a3e21bc7890123456789abcdef0123456789abcdef0123456789abcdef01234',
      blockNumber: 4892104,
      relationship: 'FIRST_REGISTRATION',
      caption: 'The moment you realize your deleted tweet was hashed on Avalanche',
      mediaUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      isOrigin: true
    },
    {
      id: 'node_2',
      fingerprint: '0x4c2b98a01f3e4d567890abcdef1234567890abcdef1234567890abcdef123456',
      registeredBy: '0x9E4431109aBC81920194B48924bcf34199014311',
      authorUsername: 'fuji_remixer',
      authorDisplayName: 'Fuji Remixer 🔺',
      authorAvatarUrl: MOCK_AUTHORS.fuji_builder.avatarUrl,
      timestamp: Math.floor((Date.now() - 1000 * 60 * 18) / 1000),
      transactionHash: '0x1f89bc4567890abcdef1234567890abcdef1234567890abcdef1234567890abc',
      blockNumber: 4893450,
      relationship: 'REMIX',
      caption: 'POV: You tried to repost the top meme but ORIGIN flashed the original receipt',
      mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      isOrigin: false
    }
  ]
};
