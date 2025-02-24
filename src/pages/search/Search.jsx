import { useLoaderData, useLocation } from 'react-router';
import { PostList } from '../../components/PostList/PostList';
import { handleData } from '../../utils/handleData';
import { useRef, useEffect, useState } from 'react';

export function Search() {
  const { search } = useLocation();
  const anchorRef = useRef(null);
  const taggedPosts = useLoaderData();

  const [posts, setPosts] = useState(taggedPosts);

  useEffect(() => {
    setPosts(taggedPosts);
  }, [taggedPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(async (entries, observer) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        observer.disconnect();
        const cursor = posts[posts.length - 1].id;
        const resp = await handleData(
          `posts/tag/${search.slice(3)}?cursor=${cursor}`
        );

        if (resp.ok) {
          const posts = await resp.json();
          console.log(posts);
          if (posts.length) {
            setPosts((prev) => {
              if (prev.length >= 100) {
                return prev.slice(10).concat(posts);
              } else return prev.concat(posts);
            });
          }
        }
      }
    });
    anchorRef.current && observer.observe(anchorRef.current);

    return () => observer.disconnect();
  }, [posts, search]);

  return <PostList posts={posts} ref={anchorRef} setPosts={setPosts} />;
}
