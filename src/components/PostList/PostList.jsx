import styles from './PostList.module.css';
// import { useLoaderData } from 'react-router';
import { useState } from 'react';
import { Post } from '../Post/Post';
import PropTypes from 'prop-types';

export function PostList({ postList }) {
  // const postData = useLoaderData();
  const [posts, setPosts] = useState(postList);

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
    console.log(id, verb);
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
    <div className={styles.postListWrapper}>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          editUpdater={updateEditedPost}
          deleteUpdater={deletePost}
          likesUpdater={togglePostLike}
          handleReplyNotes={handleReplyNotes}
        />
      ))}
    </div>
  );
}

PostList.propTypes = {
  postList: PropTypes.arrayOf(PropTypes.object),
};
