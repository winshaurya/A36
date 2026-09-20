import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import { Web3Provider } from '@/lib/providers/Web3Provider';
import { MockProvenanceProvider } from '@/lib/providers/ProvenanceProvider';
import { BRAND_CONFIG } from '@origin/shared';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
  description: 'Meme provenance protocol and social network on Avalanche C-Chain. Discover who registered memes first with verifiable receipts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-origin-base text-origin-text font-sans selection:bg-origin-accent/30 selection:text-white">
        <Web3Provider>
          <MockProvenanceProvider>
            {children}
          </MockProvenanceProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
