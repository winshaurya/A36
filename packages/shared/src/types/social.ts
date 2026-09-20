import { ContentFingerprint, ProvenanceRecord } from './provenance';

export interface Author {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  walletAddress?: `0x${string}`;
  bio?: string;
  badge?: string;
  joinedAt: number;
}

export interface Community {
  id: string;
  slug: string;
  name: string;
  description: string;
  avatarUrl: string;
  bannerUrl?: string;
  memberCount: number;
  postCount: number;
  rules?: string[];
  tags: string[];
}

export interface Comment {
  id: string;
  postId: string;
  author: Author;
  content: string;
  createdAt: number;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  parentId?: string;
  replies?: Comment[];
}

export interface MemeMedia {
  url: string;
  aspectRatio: '1:1' | '4:5' | '16:9' | '9:16' | 'auto';
  width: number;
  height: number;
  mimeType: string;
  altText?: string;
}

export interface MemePost {
  id: string;
  title: string;
  caption: string;
  media: MemeMedia;
  author: Author;
  community: Community;
  createdAt: number;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  commentsCount: number;
  sharesCount: number;
  remixesCount: number;
  isSaved?: boolean;
  tags: string[];
  
  // Decoupled Provenance Domain
  fingerprint: ContentFingerprint;
  provenance?: ProvenanceRecord;
}
