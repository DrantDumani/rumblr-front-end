import { useLoaderData, useParams } from 'react-router';
import { Profile } from '../../components/Profile/Profile';
import { HeaderImgWrapper } from '../../components/HeaderImgWrapper/HeaderImgWrapper';
import { ProfilePic } from '../../components/ProfilePic/ProfilePic';
import { AboutUser } from '../../components/AboutUser/AboutUser';
import { PostList } from '../../components/PostList/PostList';
import { jwtDecode } from 'jwt-decode';
import { FollowBtn } from '../../components/FollowBtn/FollowBtn';

export function Blog() {
  const { userData, postData } = useLoaderData();

  const params = useParams();
  const userId = jwtDecode(localStorage.getItem('token')).id;

  return (
    <>
      <Profile>
        <HeaderImgWrapper imgSrc={userData.h_img || ''} />
        <ProfilePic imgSrc={userData.pfp || ''} />
        <AboutUser about={userData.about} uname={userData.uname} />
        {userId !== userData.id && (
          <FollowBtn
            userId={userData.id}
            followData={userData.following.length > 0}
          />
        )}
      </Profile>

      <PostList postList={postData.posts} key={params.userId} />
    </>
  );
}
