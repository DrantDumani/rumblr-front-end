import PropTypes from 'prop-types';
import styles from './NotesDisplayBar.module.css';
import Message from '../../assets/icons/message.svg?react';
import Reblog from '../../assets/icons/reblog.svg?react';
import Like from '../../assets/icons/like.svg?react';

export function NotesDisplayBar({
  currDisplay,
  replyCount,
  reblogCount,
  likeCount,
  toggleDisplay,
}) {
  return (
    <menu className={styles.menuBar}>
      <li>
        <button
          onClick={() => toggleDisplay('reply')}
          className={`${styles.menuBar__btn} ${currDisplay === 'reply' ? styles['menuBar__btn--active_reply'] : ''}`}
        >
          <Message />
          {replyCount}
        </button>
      </li>
      <li>
        <button
          onClick={() => toggleDisplay('reblog')}
          className={`${styles.menuBar__btn} ${currDisplay === 'reblog' ? styles['menuBar__btn--active_reblog'] : ''}`}
        >
          <Reblog />
          {reblogCount}
        </button>
      </li>
      <li>
        <button
          onClick={() => toggleDisplay('like')}
          className={`${styles.menuBar__btn} ${currDisplay === 'like' ? styles['menuBar__btn--active_like'] : ''}`}
        >
          <Like />
          {likeCount}
        </button>
      </li>
    </menu>
  );
}

NotesDisplayBar.propTypes = {
  currDisplay: PropTypes.oneOf(['reply', 'reblog', 'like']),
  replyCount: PropTypes.number,
  reblogCount: PropTypes.number,
  likeCount: PropTypes.number,
  toggleDisplay: PropTypes.func,
};
