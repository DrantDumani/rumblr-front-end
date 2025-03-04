import anon from '../../assets/icons/incognito.svg';
import { Loading } from '../Loading/Loading';
import { useEffect, useState } from 'react';
import { EmptyNotif } from '../EmptyNotif/EmptyNotif';
import { Link } from 'react-router';
import { handleData } from '../../utils/handleData';
import PropTypes from 'prop-types';
import styles from './ReblogList.module.css';
import Reblog from '../../assets/icons/reblog.svg?react';

export function ReblogList({ postId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [reblogs, setReblogs] = useState([]);

  useEffect(() => {
    const fetchReblogs = async () => {
      setIsLoading(true);
      const resp = await handleData(`posts/${postId}/reblogs`);

      if (resp.ok) {
        const data = await resp.json();
        setReblogs(data);
      }
      setIsLoading(false);
    };

    fetchReblogs();
  }, [postId]);

  return (
    <div className={styles.reblogListWrapper}>
      {!isLoading ? (
        reblogs.length ? (
          reblogs.map((reblog) => (
            <div key={reblog.id} className={styles.reblog}>
              <Link to={`/blog/${reblog.author.id}`}>
                <img
                  src={reblog.author.pfp || anon}
                  className={styles.reblog__pfp}
                  alt={`${reblog.author}'s blog`}
                  loading="lazy"
                />
              </Link>
              <div className={styles.reblog__textWrapper}>
                <Link
                  to={`/blog/${reblog.author.id}`}
                  className={styles.reblog__textLink}
                >
                  {reblog.author.uname}
                </Link>
                <Reblog />
                <Link
                  to={`/blog/${reblog.previous.author.id}`}
                  className={styles.reblog__textLink}
                >
                  {reblog.previous.author.uname}
                </Link>
              </div>
            </div>
          ))
        ) : (
          <EmptyNotif reminderText={'This post has no reblogs'} />
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}

ReblogList.propTypes = {
  postId: PropTypes.number,
};
