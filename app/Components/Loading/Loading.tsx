import styles from './styles.module.css';

export default ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.backdrop}>
      <span className={styles.spin}>&#x21bb;</span>
    </div>
  );
};
