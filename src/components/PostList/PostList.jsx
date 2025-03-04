import styles from './PostList.module.css';
import { forwardRef } from 'react';
import { Post } from '../Post/Post';
import PropTypes from 'prop-types';
import { Loading } from '../Loading/Loading';
import { EmptyNotif } from '../EmptyNotif/EmptyNotif';

export const PostList = forwardRef(function PostList(
  { posts, setPosts, isLoading },
  anchorRef
) {
  const updateEditedPost = (post) => {
    setPosts((prev) => prev.map((p) => (p.id !== post.id ? p : post)));
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const togglePostLike = (id, method) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        else {
          const newP = structuredClone(p);
          if (method === 'DELETE') {
            newP.selfLiked = [];
            if (newP.parent) {
              newP.parent._count.usersLiked -= 1;
            } else {
              newP._count.usersLiked -= 1;
            }
          } else {
            newP.selfLiked = [{ user_id: 0 }];
            if (newP.parent) {
              newP.parent._count.usersLiked += 1;
            } else {
              newP._count.usersLiked += 1;
            }
          }
          return newP;
        }
      })
    );
  };

  const handleReplyNotes = (id, verb) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        else {
          const newP = structuredClone(p);
          if (verb === 'CREATE') {
            if (newP.parent) {
              newP.parent._count.replies += 1;
            } else {
              newP._count.replies += 1;
            }
          } else if (verb === 'DELETE') {
            if (newP.parent) {
              newP.parent._count.replies -= 1;
            } else {
              newP._count.replies -= 1;
            }
          }
          return newP;
        }
      })
    );
  };

  return (
    <>
      <div className={styles.postListWrapper}>
        {posts.length ? (
          posts.map((post, i, arr) => (
            <Post
              ref={arr.length >= 10 && i === arr.length - 2 ? anchorRef : null}
              key={post.id}
              post={post}
              editUpdater={updateEditedPost}
              deleteUpdater={deletePost}
              likesUpdater={togglePostLike}
              handleReplyNotes={handleReplyNotes}
            />
          ))
        ) : (
          <div className={styles.emptyPostWrapper}>
            <EmptyNotif reminderText={'There are no posts here'} />
          </div>
        )}
      </div>
      {isLoading && <Loading />}
    </>
  );
});

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  setPosts: PropTypes.func,
  isLoading: PropTypes.bool,
};
