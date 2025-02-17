import styles from './Index.module.css';
import { useLoaderData } from 'react-router';
import { useState } from 'react';
import { Post } from '../../components/Post/Post';

export function Index() {
  const postData = useLoaderData();
  const [posts, setPosts] = useState(postData.posts);

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
          if (method === 'DELETE') {
            const newP = structuredClone(p);
            newP.usersLiked = [];
            if (newP.parent) {
              newP.parent._count.usersLiked -= 1;
            } else {
              newP._count.usersLiked -= 1;
            }
            return newP;
          } else {
            const newP = structuredClone(p);
            newP.usersLiked = [{ user_id: 0 }];
            if (newP.parent) {
              newP.parent._count.usersLiked += 1;
            } else {
              newP._count.usersLiked += 1;
            }
            return newP;
          }
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
        />
      ))}
    </div>
  );
}
