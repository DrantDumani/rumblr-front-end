import { useLoaderData } from 'react-router';
import { Profile } from '../../components/Profile/Profile';
import { HeaderImgWrapper } from '../../components/HeaderImgWrapper/HeaderImgWrapper';
import anon from '../../assets/icons/incognito.svg';
import defHeader from '../../assets/images/default_header.png';
import { ProfilePic } from '../../components/ProfilePic/ProfilePic';
import { AboutUser } from '../../components/AboutUser/AboutUser';
import { PostList } from '../../components/PostList/PostList';

export function Blog() {
  const { userData, postData } = useLoaderData();

  return (
    <>
      <Profile>
        <HeaderImgWrapper imgSrc={userData.h_img || defHeader} />
        <ProfilePic imgSrc={userData.pfp || anon} />
        <AboutUser about={userData.about} uname={userData.uname} />
      </Profile>

      <PostList postList={postData.posts} />
    </>
  );
}
