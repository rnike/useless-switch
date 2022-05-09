import { web3 } from '@project-serum/anchor';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

const { PublicKey, clusterApiUrl } = web3;

export const PROGRAM_PUBKEY = new PublicKey(
  '8QB7HjktK1sbnnMnXBuMxo1BQpT5gcAUpcvhEmLEk9ED'
);

export const SWITCH_PUBKEY = new PublicKey(
  '2qpmiUT7YaTECGq6Eb5zXudZUZPmCP5VTeswNmzRrGNR'
);

export const NETWORK = WalletAdapterNetwork.Devnet;

export const ENDPOINT = clusterApiUrl(NETWORK);

export { default as IDL } from '../idl.json';
