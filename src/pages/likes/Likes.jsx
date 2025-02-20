import { useLoaderData } from 'react-router';
import { PostList } from '../../components/PostList/PostList';

export function Likes() {
  const likedPosts = useLoaderData().posts.map((like) => like.selfPost);
  return <PostList postList={likedPosts} />;
}
