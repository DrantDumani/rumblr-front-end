import styles from './ModalBackdrop.module.css';
import { useEffect } from 'react';

export function ModalBackdrop() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, []);
  return <div className={styles.modalBackdrop}></div>;
}
