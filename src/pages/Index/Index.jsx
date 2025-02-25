import { useLoaderData } from 'react-router';
import { PostList } from '../../components/PostList/PostList';
import { useRef, useEffect, useState } from 'react';
import { handleData } from '../../utils/handleData';

export function Index() {
  const postData = useLoaderData().posts;
  const anchorRef = useRef(null);
  const [posts, setPosts] = useState(postData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPosts[postData];
  }, [postData]);

  useEffect(() => {
    const observer = new IntersectionObserver(async (entries, observer) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        observer.disconnect();
        setIsLoading(true);
        const cursor = posts[posts.length - 1].id;
        const resp = await handleData(`posts?cursor=${cursor}`);

        if (resp.ok) {
          const { posts } = await resp.json();
          if (posts.length) {
            setPosts((prev) => {
              if (prev.length >= 100) {
                return prev.slice(10).concat(posts);
              } else return prev.concat(posts);
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
