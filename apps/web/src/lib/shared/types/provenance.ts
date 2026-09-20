export type ProvenanceStatus =
  | 'UNREGISTERED'
  | 'REGISTERING'
  | 'REGISTERED_FIRST'
  | 'REGISTERED_LATER'
  | 'EARLIER_FOUND'
  | 'REPOST'
  | 'REMIX'
  | 'DUPLICATE'
  | 'FAILED'
  | 'UNKNOWN';

export type RelationshipType =
  | 'NONE'
  | 'FIRST_REGISTRATION'
  | 'REPOST'
  | 'REMIX'
  | 'DUPLICATE'
  | 'DERIVATIVE';

export interface ContentFingerprint {
  hash: `0x${string}`;
  algorithm: 'keccak256' | 'sha256' | 'perceptual_v1';
  normalizedDimensions?: {
    width: number;
    height: number;
  };
}

export interface ProvenanceRecord {
  fingerprint: `0x${string}`;
  registeredBy: `0x${string}`;
  blockNumber: bigint | number;
  chainId: number;
  transactionHash: `0x${string}`;
  registrationTimestamp: number;
  status: ProvenanceStatus;
  relationship: RelationshipType;
  parentFingerprint?: `0x${string}`;
  remixNotes?: string;
  protocolVersion: number;
}

export interface ProvenanceTimelineNode {
  id: string;
  fingerprint: `0x${string}`;
  registeredBy: `0x${string}`;
  authorUsername: string;
  authorDisplayName: string;
  authorAvatarUrl: string;
  timestamp: number;
  transactionHash: `0x${string}`;
  blockNumber: number;
  relationship: RelationshipType;
  caption: string;
  mediaUrl: string;
  isOrigin: boolean;
}
