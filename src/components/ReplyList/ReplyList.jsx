import anon from '../../assets/icons/incognito.svg';
import Trash from '../../assets/icons/trash.svg?react';
import { useState, useEffect } from 'react';
import styles from './ReplyList.module.css';
import PropTypes from 'prop-types';
import { handleData } from '../../utils/handleData';
import { ReplyForm } from '../ReplyForm/ReplyForm';
import { ConfirmDelete } from '../ConfirmDelete/ConfirmDelete';
import { ModalBackdrop } from '../ModalBackdrop/ModalBackdrop';
import { Loading } from '../Loading/Loading';
import { EmptyNotif } from '../EmptyNotif/EmptyNotif';
import { Link } from 'react-router';

export function ReplyList({ postAuthorId, postId, handleReplyNotes, userId }) {
  const [replies, setReplies] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedReplyId, setSelectedReplyId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReplies = async () => {
      setIsLoading(true);
      const resp = await handleData(`replies/${postId}`);
      if (resp.ok) {
        const data = await resp.json();
        setReplies(data);
      }
      setIsLoading(false);
    };

    fetchReplies();
  }, [postId]);

  const handleReplySuccess = (reply) => {
    setReplies((prev) => [reply].concat(prev));
    handleReplyNotes(reply.post_id, 'CREATE');
  };

  const toggleDeleteDialog = () => {
    setShowDeleteDialog((bool) => !bool);
  };

  const selectReply = (replyId) => {
    setSelectedReplyId(replyId);
    toggleDeleteDialog();
  };

  const deletReply = async (id) => {
    if (isLoading) return;
    toggleDeleteDialog();
    setIsLoading(true);
    const resp = await handleData(`replies/${id}`, undefined, 'DELETE');

    if (resp.ok) {
      const data = await resp.json();

      setReplies((prev) => prev.filter((r) => r.id !== data.deleted_id));
      handleReplyNotes(data.deleted_id, 'DELETE');
    }
    setIsLoading(false);
  };

  const toggleLoading = () => setIsLoading((bool) => !bool);

  return (
    <>
      <ReplyForm
        postId={postId}
        onSubmitSucces={handleReplySuccess}
        isLoading={isLoading}
        setLoader={toggleLoading}
      />
      <div className={styles.replyList_Wrapper}>
        {!isLoading ? (
          replies.length ? (
            replies.map((reply) => (
              <div key={reply.id} className={styles.reply}>
                <div className={styles.reply__flex}>
                  <Link to={`/blog/${reply.author_id}`}>
                    <img
                      alt={`${reply.author.uname}'s blog`}
                      src={reply.author.pfp || anon}
                      className={styles.reply__pfp}
                    />
                  </Link>
                  <div className={styles.reply__textWrapper}>
                    <div className={styles.reply__header}>
                      <p className={styles.reply__uname}>
                        {reply.author.uname}
                      </p>
                      {postAuthorId === reply.author_id && (
                        <p className={styles.reply__reminder}>
                          Original Poster
                        </p>
                      )}
                      {userId === reply.author_id && (
                        <button
                          onClick={() => {
                            selectReply(reply.id);
                          }}
                          className={styles.reply__delBtn}
                        >
                          <Trash aria-label="Delete Reply" />
                        </button>
                      )}
                    </div>
                    <p className={styles.reply__content}>{reply.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyNotif
              reminderText={'This post has no replies. Be the first!'}
            />
          )
        ) : (
          <Loading />
        )}
      </div>
      {showDeleteDialog && (
        <>
          <ModalBackdrop />
          <ConfirmDelete
            postId={selectedReplyId}
            deleteFn={deletReply}
            closeDialogFn={toggleDeleteDialog}
            dialogText={'Are you sure you want to delete this reply?'}
          />
        </>
      )}
    </>
  );
}

ReplyList.propTypes = {
  postAuthorId: PropTypes.number,
  postId: PropTypes.number,
  handleReplyNotes: PropTypes.func,
  userId: PropTypes.number,
};
