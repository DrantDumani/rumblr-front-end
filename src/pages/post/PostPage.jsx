import { useLoaderData } from 'react-router';
import { PostList } from '../../components/PostList/PostList';

export function PostPage() {
  const post = useLoaderData();

  return <PostList postList={post} />;
}
