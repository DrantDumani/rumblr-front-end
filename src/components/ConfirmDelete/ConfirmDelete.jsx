import styles from './ConfirmDelete.module.css';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { handleData } from '../../utils/handleData';

export function ConfirmDelete({ postId, deleteFn, cancelFn }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef;
    if (dialog) {
      dialog.current.showModal();
    }
  }, []);

  const handleDelete = async (postId) => {
    const resp = await handleData(`posts/${postId}`, undefined, 'DELETE');

    if (resp.ok) {
      const data = await resp.json();
      const { deleted_postId } = data;
      deleteFn(deleted_postId);
      cancelFn();
    }
  };
  return (
    <dialog ref={dialogRef} className={styles.confirmModal}>
      <p className={styles.confirmModal__text}>
        Are you sure you want to delete this post?
      </p>
      <div className={styles.confirmModal__btnWrapper}>
        <button className={styles.confirmModal__btn} onClick={cancelFn}>
          Cancel
        </button>
        <button
          className={`${styles.confirmModal__btn} ${styles['confirmModal__btn--confirm']}`}
          onClick={() => handleDelete(postId)}
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
  cancelFn: PropTypes.func,
};
