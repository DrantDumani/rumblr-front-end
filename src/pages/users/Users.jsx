import { useLoaderData, Link } from 'react-router';
import styles from './Users.module.css';
import anon from '../../assets/icons/incognito.svg';
import { FollowBtn } from '../../components/FollowBtn/FollowBtn';
import { useState, useRef, useEffect } from 'react';
import { Loading } from '../../components/Loading/Loading';
import { handleData } from '../../utils/handleData';

export function Users() {
  const [users, setUsers] = useState(useLoaderData());
  const [isLoading, setIsLoading] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(async (entries, observer) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        observer.disconnect();
        setIsLoading(true);
        const cursor = users[users.length - 1].id;
        const resp = await handleData(`users?cursor=${cursor}`);

        if (resp.ok) {
          const users = await resp.json();
          if (users.length) {
            setUsers((prev) => {
              if (prev.length >= 100) {
                return prev.slice(10).concat(users);
              } else return prev.concat(users);
            });
          }
        }
        setIsLoading(false);
      }
    });
    anchorRef.current && observer.observe(anchorRef.current);

    return () => observer.disconnect();
  }, [users]);

  return (
    <>
      <div className={styles.userWrapper}>
        {users.map((user, i, arr) => (
          <div
            key={user.id}
            className={styles.user__card}
            ref={users.length >= 20 && i === arr.length - 2 ? anchorRef : null}
          >
            <Link className={styles.user__blogLink} to={`/blog/${user.id}`}>
              <img alt="" src={user.pfp || anon} className={styles.user__pfp} />
              <p className={styles.user__uname}>{user.uname}</p>
            </Link>

            <FollowBtn
              followData={user.following.length > 0}
              userId={user.id}
              shiftUp={false}
            />
          </div>
        ))}
      </div>
      {isLoading && <Loading />}
    </>
  );
}
