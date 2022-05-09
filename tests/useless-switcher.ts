import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { expect } from 'chai';
import { UselessSwitch } from '../target/types/useless_switch';

describe('useless-switch', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program: Program<UselessSwitch> = new anchor.workspace.UselessSwitch();
  const owner = (program.provider as anchor.AnchorProvider).wallet;

  it('should work', async () => {
    const player = anchor.web3.Keypair.generate();
    const switchKey = anchor.web3.Keypair.generate();

    await program.methods
      .init()
      .accounts({
        switch: switchKey.publicKey,
        owner: owner.publicKey,
      })
      .signers([switchKey])
      .rpc();

    const afterInit = await program.account.switch.fetch(switchKey.publicKey);

    expect(afterInit.state).to.be.false;

    await program.methods
      .toggle()
      .accounts({
        switch: switchKey.publicKey,
        user: player.publicKey,
      })
      .signers([player])
      .rpc();

    const afterFirstToggle = await program.account.switch.fetch(
      switchKey.publicKey
    );

    expect(afterFirstToggle.state).to.be.true;

    await program.methods
      .toggle()
      .accounts({
        switch: switchKey.publicKey,
        user: player.publicKey,
      })
      .signers([player])
      .rpc();

    const afterSecondToggle = await program.account.switch.fetch(
      switchKey.publicKey
    );

    expect(afterSecondToggle.state).to.be.false;
  });
});
