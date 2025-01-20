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
        <fieldset className={styles.postForm__fieldset}>
          <textarea className={styles.postForm__input}></textarea>
        </fieldset>
        <fieldset
          className={`${styles.postForm__fieldset} ${styles['postForm__fieldset--botBorder']}`}
        >
          {tagInputs.map((tag, i) => (
            <textarea
              // style={{ width: `${20 + tag[0].length * 5}px` }}
              rows={1}
              // cols={tag[0].length || 1}
              className={styles.postForm__tag}
              key={tag[1]}
              value={tag[0]}
              onChange={(e) => changeTag(e.target.value, i)}
              maxLength={140}
            ></textarea>
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
        </fieldset>
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
