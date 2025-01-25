import { useEffect, useRef, useId } from 'react';
import PropTypes from 'prop-types';
import styles from './TagInput.module.css';

export function TagInput({
  tag,
  isNew,
  changeHandler,
  keyDownHandler,
  handleBlur,
  handleTagDelete,
  isComplete,
}) {
  const tagRef = useRef(null);
  const tagId = useId();

  useEffect(() => {
    if (isNew) tagRef.current.focus();
  }, [isNew]);

  return (
    <div className={styles.tag__wrapper}>
      <span
        className={styles.tag__span}
      >{`${isComplete ? '#' : ''}${tag} ${isComplete ? 'X' : ''}`}</span>
      <div className={styles['wrapper--absolute']}>
        {isComplete && <span className={styles.inner_tag_span}>#</span>}
        <label className={styles.tag__label} htmlFor={tagId}>
          Post tag
        </label>
        <textarea
          id={tagId}
          className={styles.tag__textarea}
          ref={tagRef}
          value={tag}
          onChange={(e) => changeHandler(e)}
          onKeyDown={(e) => keyDownHandler(e)}
          onBlur={handleBlur}
          maxLength={140}
        ></textarea>
        {isComplete && (
          <button
            type="button"
            onClick={handleTagDelete}
            className={styles.deleteTag__btn}
          >
            X
          </button>
        )}
      </div>
    </div>
  );
}

TagInput.propTypes = {
  tag: PropTypes.string,
  isNew: PropTypes.bool,
  changeHandler: PropTypes.func,
  keyDownHandler: PropTypes.func,
  handleBlur: PropTypes.func,
  handleTagDelete: PropTypes.func,
  isComplete: PropTypes.bool,
};
