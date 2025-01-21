import styles from './PostForm.module.css';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import anon from '../../assets/icons/incognito.svg';
import { useState } from 'react';

export function PostForm({ togglePostModal }) {
  const token = localStorage.getItem('token');
  const user = jwtDecode(token);
  const [tagInputs, setTagInputs] = useState([]);
  const [showTagBtn, setShowTagBtn] = useState(true);

  const createNewTag = () => {
    // add an input to the list with a key
    // toggle the appearance of the button off
    // focus on the newest input
    const key = crypto.randomUUID();
    setTagInputs((t) => [...t, ['', key]]);
    setShowTagBtn(false);
  };

  const changeTag = (value, index) => {
    setTagInputs((t) =>
      t.map((val, ind) => {
        if (ind === index) {
          return [value, val[1]];
        } else {
          return val;
        }
      })
    );
  };

  return (
    <div className={styles.postForm__wrapper}>
      <div className={styles.postForm__header}>
        <img className={styles.user_pfp} src={anon} alt="" />
        <span className={styles.postForm__username}>{user.username}</span>
      </div>
      <form>
        <div className={styles.postForm__formDiv}>
          <textarea className={styles.postForm__input}></textarea>
        </div>
        <div
          className={`${styles.postForm__formDiv} ${styles['postForm__formDiv--botBorder']}`}
        >
          {tagInputs.map((tag, i) => (
            <div key={tag[1]} className={styles.postForm__tagWrapper}>
              <span className={styles.postForm__tagSpan}>{tag[0]}</span>
              <textarea
                rows={1}
                className={styles.postForm__tag}
                value={tag[0]}
                onChange={(e) => changeTag(e.target.value, i)}
                maxLength={140}
              ></textarea>
            </div>
          ))}
          {showTagBtn && (
            <button
              onClick={createNewTag}
              type="button"
              className={styles.postForm__tagBtn}
            >
              #add tags
            </button>
          )}
        </div>
        <div className={styles.postForm__btnWrapper}>
          <button
            onClick={togglePostModal}
            type="button"
            className={styles.postForm__btn}
          >
            Close
          </button>
          <button type="submit" className={styles.postForm__btn}>
            Post Now
          </button>
        </div>
      </form>
    </div>
  );
}

PostForm.propTypes = {
  togglePostModal: PropTypes.func,
};
