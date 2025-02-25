import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>Created by Darnell.</span>
      <div className={styles.footer__linkWrapper}>
        <a
          className={styles.footer__link}
          href="https://github.com/DrantDumani"
          rel="noreferrer"
          target="_blank"
        >
          Github
        </a>
        <a
          className={styles.footer__link}
          href="https://www.linkedin.com/in/darnell-james/"
          rel="noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
