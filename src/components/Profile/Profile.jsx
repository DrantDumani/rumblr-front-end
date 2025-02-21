import PropTypes from 'prop-types';
import styles from './Profile.module.css';

export function Profile({ children }) {
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profile}>{children}</div>
    </div>
  );
}

Profile.propTypes = {
  children: PropTypes.any,
};
