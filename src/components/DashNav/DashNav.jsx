import Hamburger from '../../assets/icons/hamburger.svg?react';
import { Link, useLocation, useRevalidator } from 'react-router';
import { SearchFrom } from '../SearchForm/SearchForm';
import styles from './DashNav.module.css';
import PropTypes from 'prop-types';
import { HeaderLinks } from '../HeaderLinks/HeaderLinks';
import { useEffect } from 'react';

export function DashNav({ showNav }) {
  const revalidator = useRevalidator();
  const location = useLocation();

  const resetDash = () => {
    if (location.pathname === '/') {
      revalidator.revalidate();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [revalidator.state]);

  return (
    <div className={styles.topBar}>
      <button onClick={showNav} className={styles.menuBtn}>
        <Hamburger aria-label="open menu" />
      </button>

      <Link onClick={resetDash} to={'/'} className={styles.logoLink}>
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
