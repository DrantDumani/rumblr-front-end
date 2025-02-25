import styles from './EmptyNotif.module.css';
import PropTypes from 'prop-types';

export function EmptyNotif({ reminderText }) {
  return (
    <div className={styles.notifWrapper}>
      <p className={styles.text}>{reminderText}</p>
    </div>
  );
}

EmptyNotif.propTypes = {
  reminderText: PropTypes.string,
};
