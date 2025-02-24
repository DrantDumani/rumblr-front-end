import { useLoaderData } from 'react-router';
import { PostList } from '../../components/PostList/PostList';
import { useRef, useState } from 'react';

export function PostPage() {
  const post = useLoaderData();
  const [posts, setPosts] = useState(post);
  const nullRef = useRef(null);

  return <PostList posts={posts} ref={nullRef} setPosts={setPosts} />;
}
