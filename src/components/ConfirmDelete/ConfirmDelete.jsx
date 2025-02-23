import styles from './ConfirmDelete.module.css';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

export function ConfirmDelete({ postId, deleteFn, closeDialogFn, dialogText }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef;
    if (dialog) {
      dialog.current.showModal();
    }
  }, []);

  return (
    <dialog ref={dialogRef} className={styles.confirmModal}>
      <p className={styles.confirmModal__text}>{dialogText}</p>
      <div className={styles.confirmModal__btnWrapper}>
        <button className={styles.confirmModal__btn} onClick={closeDialogFn}>
          Cancel
        </button>
        <button
          className={`${styles.confirmModal__btn} ${styles['confirmModal__btn--confirm']}`}
          onClick={() => deleteFn(postId)}
        >
          Yes
        </button>
      </div>
    </dialog>
  );
}

ConfirmDelete.propTypes = {
  postId: PropTypes.number,
  deleteFn: PropTypes.func,
  closeDialogFn: PropTypes.func,
  dialogText: PropTypes.string,
};
