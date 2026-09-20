import { defineChain } from 'viem';

export const avalancheFuji = defineChain({
  id: 43113,
  name: 'Avalanche Fuji C-Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: {
      http: ['https://api.avax-test.network/ext/bc/C/rpc'],
    },
    public: {
      http: ['https://api.avax-test.network/ext/bc/C/rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'SnowTrace (Testnet)',
      url: 'https://testnet.snowtrace.io',
    },
  },
  testnet: true,
});

export const avalancheMainnet = defineChain({
  id: 43114,
  name: 'Avalanche C-Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: {
      http: ['https://api.avax.network/ext/bc/C/rpc'],
    },
    public: {
      http: ['https://api.avax.network/ext/bc/C/rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'SnowTrace',
      url: 'https://snowtrace.io',
    },
  },
  testnet: false,
});

export const SUPPORTED_CHAINS = [avalancheFuji, avalancheMainnet] as const;
export const DEFAULT_CHAIN = avalancheFuji;
