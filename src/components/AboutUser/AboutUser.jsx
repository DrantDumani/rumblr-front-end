import styles from './AboutUser.module.css';
import PropTypes from 'prop-types';

export function AboutUser({ about, uname, cond = false, children }) {
  return (
    <div className={styles.textWrapper}>
      <h2>{uname}</h2>
      {!cond ? (
        <pre className={styles.textWrapper__text}>{about}</pre>
      ) : (
        children
      )}
    </div>
  );
}

AboutUser.propTypes = {
  about: PropTypes.string,
  uname: PropTypes.string,
  cond: PropTypes.bool,
  children: PropTypes.any,
};
