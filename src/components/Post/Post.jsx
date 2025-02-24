import PropTypes from 'prop-types';
import styles from './Post.module.css';
import anon from '../../assets/icons/incognito.svg';
import { AudioWrapper } from '../AudioWrapper/AudioWrapper';
import { VideoWrapper } from '../VideoWrapper/VideoWrapper';
import Trash from '../../assets/icons/trash.svg?react';
import Edit from '../../assets/icons/edit.svg?react';
import Reply from '../../assets/icons/message.svg?react';
import Like from '../../assets/icons/like.svg?react';
import Reblog from '../../assets/icons/reblog.svg?react';
import Share from '../../assets/icons/share.svg?react';
import { jwtDecode } from 'jwt-decode';
import { PostForm } from '../PostForm/PostForm';
import { ModalBackdrop } from '../ModalBackdrop/ModalBackdrop';
import { useState, forwardRef } from 'react';
import { ConfirmDelete } from '../ConfirmDelete/ConfirmDelete';
import { handleData } from '../../utils/handleData';
import { Link } from 'react-router';
import { ReplyList } from '../ReplyList/ReplyList';

export const Post = forwardRef(function Post(
  {
    post,
    editUpdater = () => {},
    deleteUpdater = () => {},
    likesUpdater = () => {},
    handleReplyNotes = () => {},
  },
  anchorRef
) {
  const [postModal, setPostModal] = useState('');
  const [displayDeleteForm, setDisplayDeleteForm] = useState(false);
  const [reqType, setReqType] = useState({ type: '', postId: 0 });
  const [throttle, setThrottle] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const notes = post.parent
    ? post.parent._count.usersLiked +
      post.parent._count.children +
      post.parent._count.replies
    : post._count.usersLiked + post._count.children + post._count.replies;

  const userInfo = jwtDecode(localStorage.getItem('token'));

  const toggleReplies = () => setShowReplies((bool) => !bool);

  const toggleDisplayDelete = () => {
    setDisplayDeleteForm((prev) => !prev);
  };

  const editForm = () => {
    setPostModal(post.segments[post.segments.length - 1].post_type);
    setReqType({ type: 'edit', postId: post.id });
  };

  const reblogForm = () => {
    setPostModal('text');
    setReqType({ type: 'reblog', postId: post.id });
  };

  const handleLike = async (postId) => {
    const method = post.selfLiked.length > 0 ? 'DELETE' : 'POST';
    // optimistic update
    likesUpdater(postId, method);

    // prevent user from sending another request before the first one has been sent
    if (!throttle) {
      setThrottle(true);
      const resp = await handleData(`likes/${postId}`, undefined, method);
      if (!resp.ok) {
        // undo the optimistic action
        likesUpdater(postId, method === 'DELETE' ? 'POST' : 'DELETE');
        return;
      }
      setThrottle(false);
    }
  };

  const handleDelete = async (postId) => {
    const resp = await handleData(`posts/${postId}`, undefined, 'DELETE');

    if (resp.ok) {
      const data = await resp.json();
      const { deleted_postId } = data;
      deleteUpdater(deleted_postId);
      toggleDisplayDelete();
    }
  };

  const togglePostModal = (str) => setPostModal(str);

  return (
    <>
      <article className={styles.post} ref={anchorRef}>
        <header className={styles.post__header}>
          <Link
            to={`/blog/${post.author_id}`}
            className={styles.post__blogLink}
          >
            <img
              src={post.author.pfp || anon}
              className={styles.post__author_pfp}
            />
            {post.previous ? (
              <>
                <span className={styles.post__authorName}>
                  {post.author.uname}
                </span>{' '}
                reblogged{' '}
                <span className={styles.post__authorName}>
                  {post.previous.author.uname}
                </span>
              </>
            ) : (
              <span className={styles.post__authorName}>
                {post.author.uname}
              </span>
            )}
          </Link>
        </header>

        {post.segments.length === 1 &&
        post.segments[0].author.uname === post.author.uname
          ? (post.segments[0].post_type === 'text' && (
              <div className={styles.post__contentWrapper}>
                <p className={styles.post__text}>{post.segments[0].content}</p>
              </div>
            )) ||
            (post.segments[0].post_type === 'photo' && (
              <img
                className={styles.post__img}
                src={post.segments[0].content}
                alt=""
              />
            )) ||
            (post.segments[0].post_type === 'quote' && (
              <div className={styles.post__contentWrapper}>
                <p className={styles.post__quote}>{post.segments[0].content}</p>
              </div>
            )) ||
            (post.segments[0].post_type === 'link' && (
              <div className={styles.post__contentWrapper}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={post.segments[0].content}
                >
                  {post.segments[0].content}
                </a>
              </div>
            )) ||
            (post.segments[0].post_type === 'chat' && (
              <div className={styles.post__contentWrapper}>
                <p className={styles.post__chat}>{post.segments[0].content}</p>
              </div>
            )) ||
            (post.segments[0].post_type === 'audio' && (
              <AudioWrapper audioURL={post.segments[0].content} />
            )) ||
            (post.segments[0].post_type === 'video' && (
              <VideoWrapper videoURL={post.segments[0].content} />
            ))
          : post.segments.map((segment) => (
              <div key={segment.id}>
                <div className={styles.post__segmentHeader}>
                  <Link
                    to={`/blog/${segment.author_id}`}
                    className={styles.post__blogLink}
                  >
                    <img
                      src={segment.author.pfp || anon}
                      className={styles.post__author_pfp}
                    />
                    <span className={styles.post__authorName}>
                      {segment.author.uname}
                    </span>
                  </Link>
                </div>

                {segment.post_type === 'text' && (
                  <div className={styles.post__contentWrapper}>
                    <p className={styles.post__text}>{segment.content}</p>
                  </div>
                )}
                {segment.post_type === 'photo' && (
                  <img
                    className={styles.post__img}
                    src={segment.content}
                    alt=""
                  />
                )}
                {segment.post_type === 'quote' && (
                  <div className={styles.post__contentWrapper}>
                    <p className={styles.post__quote}>{segment.content}</p>
                  </div>
                )}
                {segment.post_type === 'link' && (
                  <div className={styles.post__contentWrapper}>
                    <a target="_blank" rel="noreferrer" href={segment.content}>
                      {segment.content}
                    </a>
                  </div>
                )}
                {segment.post_type === 'chat' && (
                  <div>
                    <p className={styles.post__chat}>{segment.content}</p>
                  </div>
                )}
                {segment.post_type === 'audio' && (
                  <AudioWrapper audioURL={segment.content} />
                )}
                {segment.post_type === 'video' && (
                  <VideoWrapper videoURL={segment.content} />
                )}
              </div>
            ))}

        {/* then the tags */}
        <div className={styles.post__userControls_flex}>
          <div className={styles.post__tagWrapper}>
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                to={`/search?q=${tag.content}`}
                className={styles.post__tag}
              >
                #{tag.content}
              </Link>
            ))}
          </div>
          {userInfo.id === post.author.id && (
            <div className={styles.post__userControls}>
              <button
                onClick={toggleDisplayDelete}
                className={styles.post__svgBtn}
              >
                <Trash aria-label="Delete" />
              </button>
              <button onClick={editForm} className={styles.post__svgBtn}>
                <Edit aria-label="Edit" />
              </button>
            </div>
          )}
        </div>

        <footer className={styles.post__footer}>
          <div className={styles.footer__btnBar}>
            <button
              onClick={toggleReplies}
              className={`${styles.post__notesBtn} ${showReplies ? styles['post__notesBtn--close'] : ''}`}
            >
              <span className={styles.post__notesNum}>
                {showReplies ? <>&#10006;</> : notes}
              </span>{' '}
              {showReplies ? (
                <span className={styles['post__notesBtn--mobile-only']}>
                  Close Notes
                </span>
              ) : (
                <>{notes === 1 ? 'note' : 'notes'}</>
              )}
            </button>
            <div className={styles.post__btnWrapper}>
              <Link to={`/post/${post.id}`} className={styles.post__svgBtn}>
                <Share aria-label="Perma-link" />
              </Link>
              <button onClick={toggleReplies} className={styles.post__svgBtn}>
                <Reply />
              </button>
              <button
                aria-label="Reblog post"
                onClick={reblogForm}
                className={`${styles.post__svgBtn}`}
              >
                <Reblog />
              </button>
              <button
                onClick={() => handleLike(post.id)}
                aria-label="Like Post"
                className={`${styles.post__svgBtn} ${post.selfLiked.length ? styles['post__svgBtn--like'] : ''}`}
              >
                <Like />
              </button>
            </div>
          </div>
          {showReplies && (
            <ReplyList
              postAuthorId={post.parent?.author_id || post.author_id}
              postId={post.parent_id || post.id}
              handleReplyNotes={handleReplyNotes}
              userId={Number(userInfo.id)}
            />
          )}
        </footer>
      </article>
      {(postModal || displayDeleteForm) && <ModalBackdrop />}
      {displayDeleteForm && (
        <ConfirmDelete
          postId={post.id}
          deleteFn={handleDelete}
          closeDialogFn={toggleDisplayDelete}
          dialogText={'Are you sure you want to delete this post?'}
        />
      )}
      {postModal && (
        <PostForm
          postModal={postModal}
          togglePostModal={togglePostModal}
          reqType={reqType}
          prevValue={post.segments[post.segments.length - 1].content}
          prevTags={post.tags.map((t) => [t.content, t.id, false, true])}
          editUpdater={editUpdater}
        />
      )}
    </>
  );
});
// export

Post.propTypes = {
  post: PropTypes.object,
  editUpdater: PropTypes.func,
  deleteUpdater: PropTypes.func,
  likesUpdater: PropTypes.func,
  handleReplyNotes: PropTypes.func,
};
