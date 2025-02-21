import { useLoaderData } from 'react-router';
import { useState } from 'react';
import { Profile } from '../../components/Profile/Profile';
import { HeaderImgWrapper } from '../../components/HeaderImgWrapper/HeaderImgWrapper';
import { ProfilePic } from '../../components/ProfilePic/ProfilePic';
import { AboutUser } from '../../components/AboutUser/AboutUser';
import { PostList } from '../../components/PostList/PostList';
import styles from './Blog.module.css';
import { handleData } from '../../utils/handleData';
import { jwtDecode } from 'jwt-decode';

export function Blog() {
  const { userData, postData } = useLoaderData();
  const [submitting, setSubmitting] = useState(false);
  const [isFollowing, setIsFollowing] = useState(userData.following.length > 0);

  const userId = jwtDecode(localStorage.getItem('token')).id;

  const handleFollow = async () => {
    if (submitting) return;
    // while this function running, don't allow the user to send any more requests
    setSubmitting(true);
    // method should be POST if not following and DELETE otherwise
    const method = isFollowing ? 'DELETE' : 'POST';

    // optimistic render
    setIsFollowing((f) => !f);

    const resp = await handleData(
      `followers/${userData.id}`,
      undefined,
      method
    );

    if (!resp.ok) {
      // optimistic update failed. So change the state back to represent that
      setIsFollowing((f) => !f);
    }

    setSubmitting(false);
  };

  return (
    <>
      <Profile>
        <HeaderImgWrapper imgSrc={userData.h_img || ''} />
        <ProfilePic imgSrc={userData.pfp || ''} />
        <AboutUser about={userData.about} uname={userData.uname} />
        <div className={styles.btnContainer}>
          {userId !== userData.id && (
            <button onClick={handleFollow} className={styles.followBtn}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
      </Profile>

      <PostList postList={postData.posts} />
    </>
  );
}
