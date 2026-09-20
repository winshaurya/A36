'use client';

import React, { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider as WagmiCoreProvider, createConfig, http } from 'wagmi';
import { avalancheFuji, avalancheMainnet } from '@/lib/blockchain';

export const wagmiConfig = createConfig({
  chains: [avalancheFuji, avalancheMainnet],
  transports: {
    [avalancheFuji.id]: http('https://api.avax-test.network/ext/bc/C/rpc'),
    [avalancheMainnet.id]: http('https://api.avax.network/ext/bc/C/rpc'),
  },
});

export function Web3Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiCoreProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiCoreProvider>
  );
}
