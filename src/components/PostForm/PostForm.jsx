import styles from './PostForm.module.css';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import anon from '../../assets/icons/incognito.svg';
import Photo from '../../assets/icons/photo_side_nav.svg?react';
import Audio from '../../assets/icons/audio_side_nav.svg?react';
import { TagInput } from '../TagInput/TagInput';
import { useState, useId } from 'react';
import jsmediatags from 'jsmediatags';

export function PostForm({ togglePostModal, postModal }) {
  const token = localStorage.getItem('token');
  const user = jwtDecode(token);
  const [tagInputs, setTagInputs] = useState([]);
  const [showTagBtn, setShowTagBtn] = useState(true);

  // state for media toggling
  const [media, setMedia] = useState(null);
  const contentInputId = useId();
  const fileLimit = 2097152;

  const changeMedia = (e) => {
    if (postModal === 'photo') {
      const imgFile = e.target.files[0];
      const src = URL.createObjectURL(imgFile);
      const imgObj = { file: imgFile, src };
      setMedia(imgObj);
    } else if (postModal === 'audio') {
      const audio = e.target.files[0];
      console.log(audio);

      const src = URL.createObjectURL(audio);
      const audioObj = { file: audio, src };
      // setMedia(audioObj);
      const test = src.replace('blob:', '');
      jsmediatags.read(audio, {
        onSuccess: function ({ tags }) {
          // console.log(tags.picture);
          const { data, format } = tags.picture;
          let base64 = '';
          for (let i = 0; i < data.length; i++) {
            base64 += String.fromCharCode(data[i]);
          }
          const tempImgSrc = `data:${data.format};base64,${window.btoa(base64)}`;
          audioObj.imgSrc = tempImgSrc;
          setMedia(audioObj);
        },
        onError: (err) => console.log(err),
      });
    }
  };

  const removeMedia = () => {
    URL.revokeObjectURL(media.src);
    setMedia(null);
  };

  const submitPost = () => {
    // prevent default form submission
    // get post content based on the type of post
    // submit the post
  };

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
          {postModal === 'text' && (
            <>
              <label
                className={styles.postForm__label}
                htmlFor={contentInputId}
              >
                Post
              </label>
              <textarea
                id={contentInputId}
                className={styles.postForm__input}
              ></textarea>
            </>
          )}

          {postModal === 'photo' &&
            (media ? (
              <>
                <div className={styles.postForm__imgWrapper}>
                  <img
                    className={`${media.file.size > fileLimit ? styles['postForm__img--exceeded'] : null}`}
                    alt=""
                    src={media.src}
                  />
                  <button
                    type="button"
                    onClick={removeMedia}
                    aria-label="Delete media"
                  >
                    &#10006;
                  </button>
                  {media.file.size > fileLimit && (
                    <p className={styles.postForm__warning}>
                      File size must under 2mb
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <label
                  htmlFor={contentInputId}
                  className={styles['postForm__label--photo']}
                >
                  <Photo aria-hidden="true" />
                  <span>Custom photo</span>
                </label>
                <input
                  id={contentInputId}
                  className={styles['postForm__input--photo']}
                  type="file"
                  accept="image/*"
                  onChange={changeMedia}
                />
              </>
            ))}

          {postModal === 'quote' && (
            <>
              <label
                className={styles.postForm__label}
                htmlFor={contentInputId}
              >
                Post
              </label>
              <textarea
                id={contentInputId}
                className={`${styles.postForm__input} ${styles['postForm__input--quote']}`}
              ></textarea>
            </>
          )}

          {postModal === 'link' && (
            <>
              <label
                className={styles.postForm__label}
                htmlFor={contentInputId}
              >
                Post
              </label>
              <textarea
                id={contentInputId}
                className={`${styles.postForm__input}`}
              ></textarea>
            </>
          )}

          {postModal === 'chat' && (
            <>
              <label
                className={styles.postForm__label}
                htmlFor={contentInputId}
              >
                Post
              </label>
              <textarea
                id={contentInputId}
                className={`${styles.postForm__input} ${styles['postForm__input--chat']}`}
              ></textarea>
            </>
          )}

          {postModal === 'audio' &&
            (media ? (
              <>
                <div className={styles.postForm__imgWrapper}>
                  {/*Temp*/}
                  <img
                    className={`${media.file.size > fileLimit ? styles['postForm__img--exceeded'] : null}`}
                    alt=""
                    src={media.imgSrc}
                  />
                  <audio controls src={media.src}></audio>
                  <button
                    type="button"
                    onClick={removeMedia}
                    aria-label="Delete media"
                  >
                    &#10006;
                  </button>
                  {media.file.size > fileLimit && (
                    <p className={styles.postForm__warning}>
                      File size must under 2mb
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <label
                  htmlFor={contentInputId}
                  className={styles['postForm__label--photo']}
                >
                  <Audio aria-hidden="true" />
                  <span>Custom Audio</span>
                </label>
                <input
                  id={contentInputId}
                  className={styles['postForm__input--photo']}
                  type="file"
                  accept="audio/*"
                  onChange={changeMedia}
                />
              </>
            ))}
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
            onClick={() => togglePostModal('')}
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
  postModal: PropTypes.string,
};
