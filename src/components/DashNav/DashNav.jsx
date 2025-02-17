import Hamburger from '../../assets/icons/hamburger.svg?react';
import { Link } from 'react-router';
import { SearchFrom } from '../SearchForm/SearchForm';
import styles from './DashNav.module.css';
import PropTypes from 'prop-types';
import { HeaderLinks } from '../HeaderLinks/HeaderLinks';

export function DashNav({ showNav }) {
  // const location = useLocation();

  // const resetDashBoard = () => {
  //   if (location.pathname === '/') window.location.reload();
  // };

  // if the pathname is "/", you can just pass this component a function
  // the function would use handle Data to make a call for the most recent posts, and it would update state

  return (
    <div className={styles.topBar}>
      <button onClick={showNav} className={styles.menuBtn}>
        <Hamburger />
      </button>

      <Link to={'/'} className={styles.logoLink}>
        Rumblr
      </Link>

      <nav aria-label="topBar" className={styles.topBar__nav}>
        <HeaderLinks />
      </nav>

      <div className={styles['searchWrapper--noMobile']}>
        <SearchFrom />
      </div>
    </div>
  );
}

DashNav.propTypes = {
  showNav: PropTypes.func,
};
