import { useLoaderData, Link } from 'react-router';
import styles from './Users.module.css';
import anon from '../../assets/icons/incognito.svg';
import { FollowBtn } from '../../components/FollowBtn/FollowBtn';

export function Users() {
  const users = useLoaderData();

  return (
    <div className={styles.userWrapper}>
      {users.map((user) => (
        <div key={user.id} className={styles.user__card}>
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
  );
}
