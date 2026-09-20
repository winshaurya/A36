/**
 * Centralized Brand & Language Constants for ORIGIN
 * Ensures no hard-coded product claims or strings are scattered through components.
 */
export const BRAND_CONFIG = {
  name: 'ORIGIN',
  tagline: 'The internet forgets. The chain remembers.',
  question: 'Who registered this meme first?',
  slogans: [
    'Memes have receipts.',
    'See who got there first.',
    'Every meme has a history.',
    'Post it. Register it. Keep the receipt.',
    'Culture moves fast. Provenance is forever.'
  ],
  statusLabels: {
    REGISTERED_FIRST: 'First Registered',
    EARLIER_FOUND: 'Earlier Registration Found',
    REGISTERED_LATER: 'Registered on Chain',
    REPOST: 'Exact Repost',
    REMIX: 'Remix / Derivative',
    DUPLICATE: 'Duplicate Match',
    REGISTERING: 'Registering on Avalanche...',
    UNREGISTERED: 'Not Registered',
    FAILED: 'Registration Failed',
    UNKNOWN: 'Status Unknown',
  },
  disclaimer: 'ORIGIN establishes chronological registration provenance on Avalanche C-Chain for submitted content fingerprints. It does not certify absolute creation off-chain across the entire internet.',
};
