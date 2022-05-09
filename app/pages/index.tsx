import type { UselessSwitch } from '../../target/types/useless_switch';
import type { NextPage } from 'next';

import Switch from '../Components/Switch';
import styles from '../styles/Home.module.css';
import Reload from '../Components/Reload';
import Loading from '../Components/Loading';
import Backdrop from '../Components/Backdrop';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import useSwitchState from '../utils/useSwitchState';

const Home: NextPage = () => {
  const wallet = useWallet();

  const { reload, toggle, isLoading, isOn } = useSwitchState(wallet);

  const showLoading = isLoading || wallet.connecting;

  return (
    <div
      className={styles.container}
      style={{
        pointerEvents: showLoading ? 'none' : 'auto',
      }}
    >
      <Loading isLoading={showLoading} />
      <Backdrop isOn={isOn} />
      <div className={styles.funcBar}>
        <Reload onClick={reload} />
        <WalletMultiButton />
      </div>
      <Switch isOn={isOn} onClick={toggle} />
    </div>
  );
};

export default Home;
