import { createPublicClient, createWalletClient, http } from 'viem';
import { hardhat } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(), 
});

export const walletClient = createWalletClient({
  chain: hardhat,
  transport: http(), 
});