'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  ProvenanceRecord,
  ProvenanceStatus,
  ProvenanceTimelineNode,
  RelationshipType,
  MOCK_PROVENANCE_TIMELINE,
  MOCK_MEME_POSTS
} from '@/lib/shared';

export interface ProvenanceContextType {
  isMockMode: boolean;
  checkProvenance: (fingerprint: `0x${string}`) => Promise<{
    status: ProvenanceStatus;
    record?: ProvenanceRecord;
  }>;
  getTimeline: (fingerprint: `0x${string}`) => Promise<ProvenanceTimelineNode[]>;
  registerMeme: (
    fingerprint: `0x${string}`,
    parentFingerprint?: `0x${string}`,
    relationship?: RelationshipType,
    metadataUri?: string
  ) => Promise<{
    success: boolean;
    txHash: `0x${string}`;
    record: ProvenanceRecord;
  }>;
}

const ProvenanceContext = createContext<ProvenanceContextType | null>(null);

export function MockProvenanceProvider({ children }: { children: ReactNode }) {
  const [timelineDb, setTimelineDb] = useState(MOCK_PROVENANCE_TIMELINE);

  const checkProvenance = async (fingerprint: `0x${string}`) => {
    // Simulate brief network latency
    await new Promise((r) => setTimeout(r, 200));

    const postMatch = MOCK_MEME_POSTS.find((p) => p.fingerprint.hash === fingerprint);
    if (postMatch && postMatch.provenance) {
      return {
        status: postMatch.provenance.status,
        record: postMatch.provenance,
      };
    }

    return {
      status: 'UNREGISTERED' as ProvenanceStatus,
    };
  };

  const getTimeline = async (fingerprint: `0x${string}`) => {
    await new Promise((r) => setTimeout(r, 150));
    return timelineDb[fingerprint] || [];
  };

  const registerMeme = async (
    fingerprint: `0x${string}`,
    parentFingerprint: `0x${string}` = '0x0000000000000000000000000000000000000000000000000000000000000000',
    relationship: RelationshipType = 'FIRST_REGISTRATION',
    metadataUri: string = 'ipfs://QmOriginMockMetadata'
  ) => {
    await new Promise((r) => setTimeout(r, 600));

    const mockTxHash = `0x${Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}` as `0x${string}`;

    const newRecord: ProvenanceRecord = {
      fingerprint,
      registeredBy: '0x71C39B22C4e7a8920194B48924bcf34199018B29',
      blockNumber: 4894000 + Math.floor(Math.random() * 100),
      chainId: 43113,
      transactionHash: mockTxHash,
      registrationTimestamp: Math.floor(Date.now() / 1000),
      status: relationship === 'FIRST_REGISTRATION' ? 'REGISTERED_FIRST' : 'REMIX',
      relationship,
      parentFingerprint: parentFingerprint !== '0x0000000000000000000000000000000000000000000000000000000000000000' ? parentFingerprint : undefined,
      protocolVersion: 1,
    };

    return {
      success: true,
      txHash: mockTxHash,
      record: newRecord,
    };
  };

  return (
    <ProvenanceContext.Provider
      value={{
        isMockMode: true,
        checkProvenance,
        getTimeline,
        registerMeme,
      }}
    >
      {children}
    </ProvenanceContext.Provider>
  );
}

export function useProvenance() {
  const context = useContext(ProvenanceContext);
  if (!context) {
    throw new Error('useProvenance must be used within a ProvenanceProvider');
  }
  return context;
}
