import styles from './PostForm.module.css';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import anon from '../../assets/icons/incognito.svg';
import Photo from '../../assets/icons/photo_side_nav.svg?react';
import Audio from '../../assets/icons/audio_side_nav.svg?react';
import Video from '../../assets/icons/video_side_nav.svg?react';
import { TagInput } from '../TagInput/TagInput';
import { useState, useId, useRef } from 'react';
import { AudioWrapper } from '../AudioWrapper/AudioWrapper';
import { VideoWrapper } from '../VideoWrapper/VideoWrapper';
import { DeleteMediaBtn } from '../DeleteMediaBtn/DeleteMediaBtn';
import { FormMediaWarning } from '../FormMediaWarning/FormMediaWarning';
import { handleData } from '../../utils/handleData';

export function PostForm({ togglePostModal, postModal }) {
  const token = localStorage.getItem('token');
  const user = jwtDecode(token);
  const [tagInputs, setTagInputs] = useState([]);
  const [showTagBtn, setShowTagBtn] = useState(true);

  // state for media toggling
  const [media, setMedia] = useState(null);
  const contentInputId = useId();
  const textRef = useRef(null);
  const fileLimit = 2097152;

  const fileLimitExceeded = media && media.file.size > 2097152;

  const changeMedia = (e) => {
    if (
      postModal === 'photo' ||
      postModal === 'video' ||
      postModal === 'audio'
    ) {
      const media = e.target.files[0];
      const src = URL.createObjectURL(media);
      setMedia({ file: media, src });
    }
  };

  const removeMedia = () => {
    URL.revokeObjectURL(media.src);
    setMedia(null);
  };

  const submitPost = async (e) => {
    // maybe toggle a loading screen while sending the post
    const checkTagDupes = {};
    const filteredTags = [];

    for (let tag of tagInputs) {
      if (!checkTagDupes[tag[0]]) {
        checkTagDupes[tag[0]] = true;
        filteredTags.push(tag[0]);
      }
    }
    e.preventDefault();
    if (
      postModal !== 'photo' &&
      postModal !== 'video' &&
      postModal !== 'audio'
    ) {
      await handleData(
        'posts',
        { content: textRef.current.value, type: postModal, tags: filteredTags },
        'post'
      );
      togglePostModal('');
    } else {
      const input = new FormData();
      filteredTags.forEach((tag) => {
        input.append('tags[]', tag);
      });

      if (postModal === 'photo') {
        input.append('image', media.file);
        input.append('type', 'photo');
        await handleData('posts/photo', input, 'post', 'multipart/form-data');
      } else if (postModal === 'audio') {
        input.append('audio', media.file);
        input.append('type', 'audio');
        await handleData('posts/audio', input, 'post', 'multipart/form-data');
      } else if (postModal === 'video') {
        input.append('video', media.file);
        input.append('type', 'video');
        await handleData('posts/video', input, 'post', 'multipart/form-data');
      }
      togglePostModal('');
    }
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
      <form onSubmit={submitPost} className={styles.postForm__form}>
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
                ref={textRef}
                id={contentInputId}
                className={styles.postForm__input}
              ></textarea>
            </>
          )}

          {postModal === 'photo' &&
            (media ? (
              <div className={styles.postForm__mediaWrapper}>
                <img
                  className={`${media.file.size > fileLimit ? styles['postForm__img--exceeded'] : null}`}
                  alt=""
                  src={media.src}
                />
                <DeleteMediaBtn onClick={removeMedia} />
                {fileLimitExceeded && <FormMediaWarning />}
              </div>
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
                ref={textRef}
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
                ref={textRef}
                name="content"
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
                ref={textRef}
                placeholder="Mario: Nice of the princess to invite us over for a picnic, ay Luigi?

Luigi: I hope she makes lotsa spaghetti!"
                id={contentInputId}
                className={`${styles.postForm__input} ${styles['postForm__input--chat']}`}
              ></textarea>
            </>
          )}

          {postModal === 'audio' &&
            (media ? (
              <div className={styles.postForm__mediaWrapper}>
                <AudioWrapper audioFile={media.file} audioURL={media.src} />
                <DeleteMediaBtn onClick={removeMedia} />
                {fileLimitExceeded && <FormMediaWarning />}
              </div>
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

          {postModal === 'video' &&
            (media ? (
              <div className={styles.postForm__mediaWrapper}>
                <VideoWrapper videoURL={media.src} />
                <DeleteMediaBtn onClick={removeMedia} />
                {fileLimitExceeded && <FormMediaWarning />}
              </div>
            ) : (
              <>
                <label
                  htmlFor={contentInputId}
                  className={styles['postForm__label--photo']}
                >
                  <Video aria-hidden="true" />
                  <span>Custom Video</span>
                </label>
                <input
                  id={contentInputId}
                  className={styles['postForm__input--photo']}
                  type="file"
                  accept="video/*"
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
