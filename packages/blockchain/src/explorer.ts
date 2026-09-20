export function getExplorerUrl(
  chainId: number = 43113,
  type: 'tx' | 'address' | 'block',
  value: string | number | bigint
): string {
  const baseUrl =
    chainId === 43114
      ? 'https://snowtrace.io'
      : 'https://testnet.snowtrace.io';

  switch (type) {
    case 'tx':
      return `${baseUrl}/tx/${value}`;
    case 'address':
      return `${baseUrl}/address/${value}`;
    case 'block':
      return `${baseUrl}/block/${value}`;
    default:
      return baseUrl;
  }
}

export function formatAddress(address: string, chars: number = 4): string {
  if (!address || address.length < 10) return address;
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

export function formatTxHash(txHash: string, chars: number = 4): string {
  if (!txHash || txHash.length < 10) return txHash;
  return `${txHash.substring(0, chars + 2)}...${txHash.substring(txHash.length - chars)}`;
}
