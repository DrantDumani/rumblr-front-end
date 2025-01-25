import styles from './PostForm.module.css';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import anon from '../../assets/icons/incognito.svg';
import { TagInput } from '../TagInput/TagInput';
import { useState, useId } from 'react';

export function PostForm({ togglePostModal }) {
  const token = localStorage.getItem('token');
  const user = jwtDecode(token);
  const [tagInputs, setTagInputs] = useState([]);
  const [showTagBtn, setShowTagBtn] = useState(true);
  const textAreaId = useId();

  const createNewTag = () => {
    const key = crypto.randomUUID();
    setTagInputs((t) => [...t, ['', key, true, false]]);
    setShowTagBtn(false);
  };

  const changeTag = (value, index) => {
    setTagInputs((t) =>
      t.map((val, ind) => {
        if (ind === index) {
          return [value, val[1], false, val[3]];
        } else {
          return val;
        }
      })
    );
  };

  const trimTagOnBlur = (value, index) => {
    const trimmed = value.trim();
    if (trimmed) {
      setTagInputs((t) =>
        t.map((val, ind) => {
          if (ind === index) {
            return [trimmed, val[1], false, true];
          } else {
            return val;
          }
        })
      );
    } else {
      deleteTag(index);
      setShowTagBtn(true);
    }
  };

  const deleteTag = (index) => {
    setTagInputs((t) => t.filter((val, ind) => val[0] && index !== ind));
  };

  const completeAndChangeTag = (e, tag) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (tag) {
        createNewTag();
      }
    }
  };

  return (
    <div className={styles.postForm__wrapper}>
      <div className={styles.postForm__header}>
        <img className={styles.user_pfp} src={anon} alt="" />
        <span className={styles.postForm__username}>{user.username}</span>
      </div>
      <form>
        <div className={styles.postForm__inputWrapper}>
          <label className={styles.postForm__label} htmlFor={textAreaId}>
            Post
          </label>
          <textarea
            id={textAreaId}
            className={styles.postForm__input}
          ></textarea>
        </div>
        <div className={` ${styles['postForm__formDiv--botBorder']}`}>
          {tagInputs.map((tag, i) => (
            <TagInput
              key={tag[1]}
              tag={tag[0]}
              isNew={tag[2]}
              changeHandler={(e) => {
                changeTag(e.target.value, i);
              }}
              keyDownHandler={(e) => {
                completeAndChangeTag(e, tag[0]);
              }}
              handleBlur={() => trimTagOnBlur(tag[0], i)}
              isComplete={tag[3]}
              handleTagDelete={() => deleteTag(i)}
            />
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
