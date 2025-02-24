import { useLoaderData, useLocation } from 'react-router';
import { PostList } from '../../components/PostList/PostList';

export function Search() {
  const { search } = useLocation();

  const taggedPosts = useLoaderData();
  return <PostList postList={taggedPosts} key={search} />;
}
