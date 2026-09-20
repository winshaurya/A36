export const CONTRACT_ADDRESSES = {
  fuji: {
    provenanceRegistry: '0x27ca712c47562555b7b726fc1c2716195bfc60f8' as `0x${string}`,
  },
  mainnet: {
    provenanceRegistry: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  },
};

export function getProvenanceRegistryAddress(chainId: number = 43113): `0x${string}` {
  return chainId === 43114
    ? CONTRACT_ADDRESSES.mainnet.provenanceRegistry
    : CONTRACT_ADDRESSES.fuji.provenanceRegistry;
}
