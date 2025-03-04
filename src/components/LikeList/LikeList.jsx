import anon from '../../assets/icons/incognito.svg';
import { Loading } from '../Loading/Loading';
import styles from './LikeList.module.css';
import { useEffect, useState } from 'react';
import { EmptyNotif } from '../EmptyNotif/EmptyNotif';
import { Link } from 'react-router';
import { handleData } from '../../utils/handleData';
import PropTypes from 'prop-types';

export function LikeList({ postId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      setIsLoading(true);
      const resp = await handleData(`likes/${postId}`);
      if (resp.ok) {
        const data = await resp.json();
        setLikes(data);
      }
      setIsLoading(false);
    };

    fetchLikes();
  }, [postId]);

  return (
    <div className={styles.likesWrapper}>
      {!isLoading ? (
        likes.length ? (
          likes.map((like) => (
            <div key={like.id} className={styles.like}>
              <Link to={`/blog/${like.user.id}`}>
                <img
                  className={styles.like__pfp}
                  alt={`${like.user.uname}'s blog`}
                  loading="lazy"
                  src={like.user.pfp || anon}
                />
              </Link>
              <Link
                className={styles.like__textLink}
                to={`/blog/${like.user.id}`}
              >
                <p className={styles.like__uname}>{like.user.uname}</p>
              </Link>
            </div>
          ))
        ) : (
          <EmptyNotif reminderText={'This post has no likes yet'} />
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}

LikeList.propTypes = {
  postId: PropTypes.number,
};
