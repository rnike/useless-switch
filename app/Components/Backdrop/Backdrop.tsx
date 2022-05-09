import styles from './Backdrop.module.css';

interface Props {
  isOn: boolean;
}

export default ({ isOn }: Props) => {
  return <div className={`${styles.backdrop} ${isOn && styles.on}`} />;
};
