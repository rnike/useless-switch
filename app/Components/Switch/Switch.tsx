import styles from './styles.module.css';

interface Props {
  isOn: boolean;
  onClick: () => void;
}

export default ({ isOn, onClick }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.border}>
        <button
          className={`${styles.switch} ${isOn ? styles.on : styles.off}`}
          onClick={onClick}
        />
      </div>
    </div>
  );
};
