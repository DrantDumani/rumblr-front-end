import { useLoaderData } from 'react-router';
import { PostList } from '../../components/PostList/PostList';
import { handleData } from '../../utils/handleData';
import { useRef, useEffect, useState } from 'react';

export function Likes() {
  const likedPosts = useLoaderData().posts.map((like) => like.selfPost);
  const anchorRef = useRef(null);
  const [posts, setPosts] = useState(likedPosts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(async (entries, observer) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        observer.disconnect();
        setIsLoading(true);
        const cursor = posts[posts.length - 1].id;
        const resp = await handleData(`likes?cursor=${cursor}`);

        if (resp.ok) {
          const { posts } = await resp.json();
          const likes = posts.map((p) => p.selfPost);

          if (likes.length) {
            setPosts((prev) => {
              if (prev.length >= 100) {
                return prev.slice(10).concat(likes);
              } else return prev.concat(likes);
            });
          }
        }
        setIsLoading(false);
      }
    });
    anchorRef.current && observer.observe(anchorRef.current);

    return () => observer.disconnect();
  }, [posts]);

  return (
    <PostList
      posts={posts}
      setPosts={setPosts}
      ref={anchorRef}
      isLoading={isLoading}
    />
  );
}
