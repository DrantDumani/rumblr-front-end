import styles from './ReplyForm.module.css';
import { useState, useId, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Send from '../../assets/icons/send.svg?react';
import { jwtDecode } from 'jwt-decode';
import anon from '../../assets/icons/incognito.svg';
import { handleData } from '../../utils/handleData';

export function ReplyForm({ postId, onSubmitSucces, isLoading, setLoader }) {
  const [reply, setReply] = useState('');
  const id = useId();
  const replyRef = useRef();
  const user = jwtDecode(localStorage.getItem('token'));

  const handleChange = (e) => setReply(e.target.value);
  const validReply = reply.trim().length;

  const submitReply = async () => {
    if (!validReply || isLoading) return;

    setLoader();
    // disable form submission to prevent the user from accidentally submitting duplicate replies

    const resp = await handleData(
      `replies/${postId}`,
      { content: reply },
      'POST'
    );
    if (resp.ok) {
      setReply('');
      const data = await resp.json();

      onSubmitSucces(data.reply);
    } else {
      // let the user know that the reply did not go through
    }
    setLoader();
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      return submitReply();
    }
  };

  useEffect(() => {
    if (replyRef.current) {
      replyRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.form}>
      <div className={styles['form__wrapper--relative']}>
        <pre className={styles.form__span}>{reply}</pre>
        <div className={styles.form__flex}>
          <img className={styles.form__pfp} alt="" src={user.pfp || anon} />
          <div className={styles.form__inputWrapper}>
            <div className={styles.form__innerWrapper}>
              <label className={styles.form__label} htmlFor={id}>
                Post Reply
              </label>
              <textarea
                id={id}
                className={styles.form__reply}
                maxLength={1000}
                ref={replyRef}
                value={reply}
                onChange={handleChange}
                onKeyDown={handleEnterKey}
              ></textarea>
            </div>
            <button
              onClick={submitReply}
              disabled={!validReply}
              className={styles.form__send}
            >
              <Send aria-label="Send Reply" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ReplyForm.propTypes = {
  postId: PropTypes.number,
  onSubmitSucces: PropTypes.func,
  isLoading: PropTypes.bool,
  setLoader: PropTypes.func,
};
