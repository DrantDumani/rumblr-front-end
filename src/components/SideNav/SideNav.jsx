import { Link } from 'react-router';
import styles from './SideNav.module.css';
import Text from '../../assets/icons/text_side_nav.svg?react';
import Photo from '../../assets/icons/photo_side_nav.svg?react';
import Quote from '../../assets/icons/quote_side_nav.svg?react';
import Link_svg from '../../assets/icons/link_side_nav.svg?react';
import Chat from '../../assets/icons/chat_side_nav.svg?react';
import Audio from '../../assets/icons/audio_side_nav.svg?react';
import Video from '../../assets/icons/video_side_nav.svg?react';
import Messages from '../../assets/icons/messages_side_nav.svg?react';
import Settings from '../../assets/icons/settings.svg?react';
import PropTypes from 'prop-types';

export function SideNav({ showMobileSideNav = false, hideMobileSideNav }) {
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
          <button className={styles.sideNavOption}>
            <Text aria-hidden="true" />
            <span>Text</span>
          </button>
        </li>
        <li className={styles.sideNav__item}>
          <button className={styles.sideNavOption}>
            <Photo aria-hidden="true" />
            <span>Photo</span>
          </button>
        </li>
        <li className={styles.sideNav__item}>
          <button className={styles.sideNavOption}>
            <Quote aria-hidden="true" />
            <span>Quote</span>
          </button>
        </li>
        <li className={styles.sideNav__item}>
          <button className={styles.sideNavOption}>
            <Link_svg aria-hidden="true" />
            <span>Link</span>
          </button>
        </li>
        <li className={styles.sideNav__item}>
          <button className={styles.sideNavOption}>
            <Chat aria-hidden="true" />
            <span>Chat</span>
          </button>
        </li>
        <li className={styles.sideNav__item}>
          <button className={styles.sideNavOption}>
            <Audio aria-hidden="true" />
            <span>Audio</span>
          </button>
        </li>
        <li className={styles.sideNav__item}>
          <button className={styles.sideNavOption}>
            <Video aria-hidden="true" />
            <span>Video</span>
          </button>
        </li>
        <li>
          <nav aria-label="sidebar">
            <ul>
              <li className={styles.sideNav__item}>
                <Link className={styles.sideNavOption}>
                  <Messages aria-hidden="true" />
                  <span>Messages</span>
                </Link>
              </li>
              <li className={styles.sideNav__item}>
                <Link className={styles.sideNavOption}>
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
};
