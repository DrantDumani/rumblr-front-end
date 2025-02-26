import { NavLink } from 'react-router';
import styles from './HeaderLinks.module.css';

export function HeaderLinks() {
  return (
    <ul className={styles.navFlex2}>
      <li>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLink__active}`
              : styles.navLink
          }
        >
          Following
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'/likes'}
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLink__active}`
              : styles.navLink
          }
        >
          Likes
        </NavLink>
      </li>
    </ul>
  );
}
