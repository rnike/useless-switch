import type { UselessSwitch } from '../../target/types/useless_switch';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { PROGRAM_PUBKEY, SWITCH_PUBKEY, ENDPOINT, IDL } from '../utils/config';
import { AnchorProvider, Program, web3 } from '@project-serum/anchor';

export default (wallet: WalletContextState) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOn, setIsOn] = useState(false);

  const program = useMemo(() => {
    const conn = new web3.Connection(ENDPOINT);
    // @ts-expect-error
    const prov = new AnchorProvider(conn, wallet, {
      preflightCommitment: 'processed',
    });

    // @ts-expect-error
    return new Program(IDL, PROGRAM_PUBKEY, prov) as Program<UselessSwitch>;
  }, [wallet]);

  const reload = useCallback(() => {
    setIsLoading(true);

    try {
      program.account.switch.fetch(SWITCH_PUBKEY).then(({ state }) => {
        console.log(`state fetched: ${state}`);
        setIsOn(state);
        setIsLoading(false);
      });
    } catch (error) {
      alert(error);
      reload();
    }
  }, [program]);

  useEffect(() => {
    reload(); // fetch state on mount
  }, []);

  const toggle = useCallback(async () => {
    if (!wallet.signTransaction || !wallet.publicKey) {
      alert('no wallet connect');

      return;
    }

    setIsLoading(true);

    try {
      const tx = await program.methods
        .toggle()
        .accounts({
          switch: SWITCH_PUBKEY,
        })
        .rpc();

      console.log(
        `Transaction success\nhttps://explorer.solana.com/tx/${tx}?cluster=devnet`
      );
    } catch (error) {
      alert(error);
    }

    reload();
  }, [program, reload, wallet]);

  return { isOn, isLoading, reload, toggle };
};
