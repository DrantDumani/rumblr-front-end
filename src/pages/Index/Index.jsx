import { useLoaderData } from 'react-router';
import { PostList } from '../../components/PostList/PostList';

export function Index() {
  const postData = useLoaderData().posts;

  return <PostList postList={postData} />;
}
