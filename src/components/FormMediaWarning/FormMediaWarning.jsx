import styles from './FormMediaWarning.module.css';

export function FormMediaWarning() {
  return <p className={styles.warning}>File size must be under 2MB</p>;
}
