import PropTypes from 'prop-types';
import styles from './DeleteMediaBtn.module.css';

export function DeleteMediaBtn({ onClick }) {
  return (
    <button
      type="button"
      aria-label="Delete media"
      onClick={onClick}
      className={styles.delete_media_btn}
    >
      &#10006;
    </button>
  );
}

DeleteMediaBtn.propTypes = {
  onClick: PropTypes.func,
};
