import styles from './ProfilePic.module.css';
import PropTypes from 'prop-types';

export function ProfilePic({ children, imgSrc }) {
  return (
    <div className={styles.imgWrapper}>
      <img className={styles.imgWrapper__pfp} src={imgSrc} alt="" />
      {children}
    </div>
  );
}

ProfilePic.propTypes = {
  imgSrc: PropTypes.string,
  children: PropTypes.any,
};
