import { useState, useEffect } from 'react';
import styles from './Loading.module.css';

const squares = [1, 2, 3];

export function Loading() {
  const [aniIndex, setAniIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setAniIndex((n) => (n + 1) % squares.length);
    }, 200);

    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.loadingWrapper}>
      {squares.map((_, i) => (
        <div
          className={`${styles.loader} ${aniIndex === i ? styles.large : ''}`}
          key={i}
        ></div>
      ))}
    </div>
  );
}
