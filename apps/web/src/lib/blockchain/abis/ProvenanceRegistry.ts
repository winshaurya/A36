export const PROVENANCE_REGISTRY_ABI = [
  {
    type: 'function',
    name: 'registerFingerprint',
    inputs: [
      { name: 'fingerprint', type: 'bytes32', internalType: 'bytes32' },
      { name: 'parentFingerprint', type: 'bytes32', internalType: 'bytes32' },
      { name: 'relationship', type: 'uint8', internalType: 'uint8' },
      { name: 'metadataUri', type: 'string', internalType: 'string' }
    ],
    outputs: [{ name: 'registrationIndex', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getEarliestRegistration',
    inputs: [{ name: 'fingerprint', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [
      {
        name: 'record',
        type: 'tuple',
        internalType: 'struct ProvenanceRegistry.Record',
        components: [
          { name: 'fingerprint', type: 'bytes32', internalType: 'bytes32' },
          { name: 'registeredBy', type: 'address', internalType: 'address' },
          { name: 'registeredAt', type: 'uint64', internalType: 'uint64' },
          { name: 'blockNumber', type: 'uint64', internalType: 'uint64' },
          { name: 'parentFingerprint', type: 'bytes32', internalType: 'bytes32' },
          { name: 'relationship', type: 'uint8', internalType: 'uint8' },
          { name: 'metadataUri', type: 'string', internalType: 'string' }
        ]
      },
      { name: 'exists', type: 'bool', internalType: 'bool' }
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isRegistered',
    inputs: [{ name: 'fingerprint', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalRegistrations',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'MemeRegistered',
    inputs: [
      { name: 'fingerprint', type: 'bytes32', indexed: true, internalType: 'bytes32' },
      { name: 'registeredBy', type: 'address', indexed: true, internalType: 'address' },
      { name: 'isFirstRegistration', type: 'bool', indexed: true, internalType: 'bool' },
      { name: 'registeredAt', type: 'uint64', indexed: false, internalType: 'uint64' },
      { name: 'blockNumber', type: 'uint64', indexed: false, internalType: 'uint64' },
      { name: 'parentFingerprint', type: 'bytes32', indexed: false, internalType: 'bytes32' },
      { name: 'relationship', type: 'uint8', indexed: false, internalType: 'uint8' },
      { name: 'metadataUri', type: 'string', indexed: false, internalType: 'string' }
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'InvalidFingerprint',
    inputs: [],
  },
  {
    type: 'error',
    name: 'AlreadyRegisteredAsOrigin',
    inputs: [{ name: 'fingerprint', type: 'bytes32', internalType: 'bytes32' }],
  }
] as const;
