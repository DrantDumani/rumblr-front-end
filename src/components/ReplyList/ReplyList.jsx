import anon from '../../assets/icons/incognito.svg';
import Trash from '../../assets/icons/trash.svg?react';
import { useState, useEffect } from 'react';
import styles from './ReplyList.module.css';
import PropTypes from 'prop-types';
import { handleData } from '../../utils/handleData';
import { ReplyForm } from '../ReplyForm/ReplyForm';

export function ReplyList({ postAuthorId, postId, handleReplyNotes }) {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchReplies = async () => {
      const resp = await handleData(`replies/${postId}`);
      if (resp.ok) {
        const data = await resp.json();
        setReplies(data);
      }
    };

    fetchReplies();
  }, [postId]);

  const handleReplySuccess = (reply) => {
    setReplies((prev) => [reply].concat(prev));
    handleReplyNotes(reply.post_id, 'CREATE');
  };

  return (
    <>
      <ReplyForm postId={postId} onSubmitSucces={handleReplySuccess} />
      <div className={styles.replyList_Wrapper}>
        {replies.map((reply) => (
          <div key={reply.id} className={styles.reply}>
            <div className={styles.reply__flex}>
              <img
                alt=""
                src={reply.author.pfp || anon}
                className={styles.reply__pfp}
              />
              <div className={styles.reply__textWrapper}>
                <div className={styles.reply__header}>
                  <p className={styles.reply__uname}>{reply.author.uname}</p>
                  {postAuthorId === reply.author_id && (
                    <p className={styles.reply__reminder}>Original Poster</p>
                  )}
                  <button className={styles.reply__delBtn}>
                    <Trash aria-label="Delete Reply" />
                  </button>
                </div>
                <p className={styles.reply__content}>{reply.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

ReplyList.propTypes = {
  postAuthorId: PropTypes.number,
  postId: PropTypes.number,
  handleReplyNotes: PropTypes.func,
};
