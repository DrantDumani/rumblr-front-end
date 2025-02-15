import styles from './PostMenu.module.css';
import PropTypes from 'prop-types';
import Audio from '../../assets/icons/audio_top_nav.svg?react';
import Chat from '../../assets/icons/chat_top_nav.svg?react';
import Link from '../../assets/icons/link_top_nav.svg?react';
import Photo from '../../assets/icons/photo_top_nav.svg?react';
import Quote from '../../assets/icons/quote_top_nav.svg?react';
import Text from '../../assets/icons/text_top_nav.svg?react';
import Video from '../../assets/icons/video_top_nav.svg?react';

export function PostMenu({ toggleOpt }) {
  return (
    <menu className={styles.postMenu}>
      <button
        aria-label="Text Post"
        onClick={() => toggleOpt('text')}
        className={styles.postMenu__btn}
      >
        <Text />
      </button>
      <button
        aria-label="Photo Post"
        onClick={() => toggleOpt('photo')}
        className={styles.postMenu__btn}
      >
        <Photo />
      </button>
      <button
        aria-label="Quote Post"
        onClick={() => toggleOpt('quote')}
        className={styles.postMenu__btn}
      >
        <Quote />
      </button>
      <button
        aria-label="Link Post"
        onClick={() => toggleOpt('link')}
        className={styles.postMenu__btn}
      >
        <Link />
      </button>
      <button
        aria-label="Chat Post"
        onClick={() => toggleOpt('chat')}
        className={styles.postMenu__btn}
      >
        <Chat />
      </button>
      <button
        aria-label="Audio Post"
        onClick={() => toggleOpt('audio')}
        className={styles.postMenu__btn}
      >
        <Audio />
      </button>
      <button
        aria-label="Video Post"
        onClick={() => toggleOpt('video')}
        className={styles.postMenu__btn}
      >
        <Video />
      </button>
    </menu>
  );
}

PostMenu.propTypes = {
  toggleOpt: PropTypes.func,
};
