import styles from './FollowBtn.module.css';
import { useState } from 'react';
import { handleData } from '../../utils/handleData';
import PropTypes from 'prop-types';

export function FollowBtn({ followData, userId, shiftUp = true }) {
  const [submitting, setSubmitting] = useState(false);
  const [isFollowing, setIsFollowing] = useState(followData);

  const handleFollow = async () => {
    if (submitting) return;
    // while this function running, don't allow the user to send any more requests
    setSubmitting(true);
    // method should be POST if not following and DELETE otherwise
    const method = isFollowing ? 'DELETE' : 'POST';

    // optimistic render
    setIsFollowing((f) => !f);

    const resp = await handleData(`followers/${userId}`, undefined, method);

    if (!resp.ok) {
      // optimistic update failed. So change the state back to represent that
      setIsFollowing((f) => !f);
    }
    setSubmitting(false);
  };

  return (
    <div
      className={`${styles.btnContainer} ${shiftUp ? styles['btnContainer--top'] : ''}`}
    >
      <button onClick={handleFollow} className={styles.followBtn}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
}

FollowBtn.propTypes = {
  followData: PropTypes.bool,
  userId: PropTypes.number,
  shiftUp: PropTypes.bool,
};
