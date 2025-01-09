import Hamburger from '../../assets/icons/hamburger.svg?react';
import Search from '../../assets/icons/search.svg?react';
import { Link, NavLink } from 'react-router';
import { useId } from 'react';
import styles from './DashNav.module.css';

export function DashNav({ showNav }) {
  const id = useId();

  return (
    <nav>
      <ul className={styles.navFlex1}>
        <li className={styles.listItemBtn}>
          <button onClick={showNav} className={styles.navHamburger}>
            <Hamburger />
          </button>
        </li>
        <li>
          <Link
            onClick={() => window.location.reload()}
            to={'/'}
            className={styles.logoLink}
          >
            Rumblr
          </Link>
        </li>
        <li>
          <ul className={styles.ulNested}>
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
        </li>

        <li className={styles.formListItem}>
          <search>
            <form className={styles.searchForm}>
              <label
                aria-labelledby="searchTag"
                htmlFor={id}
                className={styles.searchLabel}
              >
                <Search title="searchTag" />
              </label>
              <input className={styles.searchInput} id={id} type="search" />
            </form>
          </search>
        </li>
      </ul>
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
    </nav>
  );
}
