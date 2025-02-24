import { useLoaderData } from 'react-router';
import { Profile } from '../../components/Profile/Profile';
import { HeaderImgWrapper } from '../../components/HeaderImgWrapper/HeaderImgWrapper';
import { ProfilePic } from '../../components/ProfilePic/ProfilePic';
import { AboutUser } from '../../components/AboutUser/AboutUser';
import { PostList } from '../../components/PostList/PostList';
import { jwtDecode } from 'jwt-decode';
import { FollowBtn } from '../../components/FollowBtn/FollowBtn';
import { useState, useEffect, useRef } from 'react';
import { handleData } from '../../utils/handleData';

export function Blog() {
  const { userData, postData } = useLoaderData();
  const [posts, setPosts] = useState(postData.posts);
  const anchorRef = useRef(null);

  const userId = jwtDecode(localStorage.getItem('token')).id;

  // if the user id changes from this page, you'll want the posts to change too.
  useEffect(() => {
    setPosts(postData.posts);
  }, [postData.posts]);

  useEffect(() => {
    // repeated line to prevent dependency issues
    const userId = jwtDecode(localStorage.getItem('token')).id;

    const observer = new IntersectionObserver(async (entries, observer) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        observer.disconnect();
        const cursor = posts[posts.length - 1].id;
        const resp = await handleData(`posts/user/${userId}?cursor=${cursor}`);

        if (resp.ok) {
          const { posts } = await resp.json();
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
  }, [posts]);

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

      <PostList posts={posts} setPosts={setPosts} ref={anchorRef} />
    </>
  );
}
