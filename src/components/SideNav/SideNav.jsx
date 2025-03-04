import { Link } from 'react-router';
import styles from './SideNav.module.css';
import Text from '../../assets/icons/text_side_nav.svg?react';
import Photo from '../../assets/icons/photo_side_nav.svg?react';
import Quote from '../../assets/icons/quote_side_nav.svg?react';
import Link_svg from '../../assets/icons/link_side_nav.svg?react';
import Chat from '../../assets/icons/chat_side_nav.svg?react';
import Audio from '../../assets/icons/audio_side_nav.svg?react';
import Video from '../../assets/icons/video_side_nav.svg?react';
import Settings from '../../assets/icons/settings.svg?react';
import Blog from '../../assets/icons/blog.svg?react';
import Users from '../../assets/icons/users.svg?react';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';

export function SideNav({
  showMobileSideNav = false,
  hideMobileSideNav = () => {},
  togglePostModal,
}) {
  const userId = jwtDecode(localStorage.getItem('token')).id;
  return (
    <menu
      className={`${styles.sideNav} ${showMobileSideNav && styles['sideNav--active']}`}
    >
      <ul className={styles.sideNav_ul}>
        <li
          className={`${styles.sideNav__item} ${styles['sideNav__item--noMobile']}`}
        >
          <button
            onClick={hideMobileSideNav}
            className={`${styles.sideNavOption} ${styles.sideNavOption__closeBtn}`}
          >
            &#10006;
          </button>
        </li>
        <li className={styles.sideNav__item}>
          <button
            onClick={() => {
              togglePostModal('text');
              hideMobileSideNav();
            }}
            className={styles.sideNavOption}
          >
            <Text aria-hidden="true" />
            <span>Text</span>
          </button>
        </li>
        <li className={styles.sideNav__item}>
          <button
            onClick={() => {
              togglePostModal('photo');
              hideMobileSideNav();
            }}
            className={styles.sideNavOption}
          >
            <Photo aria-hidden="true" />
            <span>Photo</span>
          </button>
        </li>
        <li className={styles.sideNav__item}>
          <button
            onClick={() => {
              togglePostModal('quote');
              hideMobileSideNav();
            }}
            className={styles.sideNavOption}
          >
            <Quote aria-hidden="true" />
            <span>Quote</span>
          </button>
        </li>
        <li className={styles.sideNav__item}>
          <button
            onClick={() => {
              togglePostModal('link');
              hideMobileSideNav();
            }}
            className={styles.sideNavOption}
          >
            <Link_svg aria-hidden="true" />
            <span>Link</span>
          </button>
        </li>
        <li className={styles.sideNav__item}>
          <button
            onClick={() => {
              togglePostModal('chat');
              hideMobileSideNav();
            }}
            className={styles.sideNavOption}
          >
            <Chat aria-hidden="true" />
            <span>Chat</span>
          </button>
        </li>
        <li className={styles.sideNav__item}>
          <button
            onClick={() => {
              togglePostModal('audio');
              hideMobileSideNav();
            }}
            className={styles.sideNavOption}
          >
            <Audio aria-hidden="true" />
            <span>Audio</span>
          </button>
        </li>
        <li className={styles.sideNav__item}>
          <button
            onClick={() => {
              togglePostModal('video');
              hideMobileSideNav();
            }}
            className={styles.sideNavOption}
          >
            <Video aria-hidden="true" />
            <span>Video</span>
          </button>
        </li>
        <li>
          <nav aria-label="sidebar">
            <ul>
              {/* <li className={styles.sideNav__item}>
                <Link className={styles.sideNavOption}>
                  <Messages aria-hidden="true" />
                  <span>Messages</span>
                </Link>
              </li> */}
              <li className={styles.sideNav__item}>
                <Link
                  className={styles.sideNavOption}
                  onClick={hideMobileSideNav}
                  to={`blog/${userId}`}
                >
                  <Blog aria-hidden="true" />
                  <span>Blog</span>
                </Link>
              </li>
              <li className={styles.sideNav__item}>
                <Link
                  className={styles.sideNavOption}
                  onClick={hideMobileSideNav}
                  to={'users'}
                >
                  <Users aria-hidden="true" />
                  <span>Users</span>
                </Link>
              </li>
              <li className={styles.sideNav__item}>
                <Link
                  onClick={hideMobileSideNav}
                  to="settings"
                  className={styles.sideNavOption}
                >
                  <Settings aria-hidden="true" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </li>
      </ul>
    </menu>
  );
}

SideNav.propTypes = {
  showMobileSideNav: PropTypes.bool,
  hideMobileSideNav: PropTypes.func,
  togglePostModal: PropTypes.func,
};
