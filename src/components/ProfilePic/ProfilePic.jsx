import styles from './ProfilePic.module.css';
import PropTypes from 'prop-types';
import anon from '../../assets/icons/incognito.svg';

export function ProfilePic({ children, imgSrc }) {
  return (
    <div className={styles.imgWrapper}>
      <img
        loading="lazy"
        className={styles.imgWrapper__pfp}
        src={imgSrc || anon}
        alt=""
      />
      {children}
    </div>
  );
}

ProfilePic.propTypes = {
  imgSrc: PropTypes.string,
  children: PropTypes.any,
};
