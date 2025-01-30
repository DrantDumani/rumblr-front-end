import { read } from 'jsmediatags';
import { useEffect, useState } from 'react';
import styles from './AudioWrapper.module.css';
import PropTypes from 'prop-types';
import musicNote from '../../assets/icons/music-note.svg';

export function AudioWrapper({ audio }) {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const src = URL.createObjectURL(audio);
    read(audio, {
      onSuccess: ({ tags }) => {
        const audioObj = {};
        audioObj.src = src;
        audioObj.title = tags.title;
        audioObj.album = tags.album;
        audioObj.artist = tags.artist;

        if (tags.picture) {
          const { data } = tags.picture;
          let base64 = '';
          for (let i = 0; i < data.length; i++) {
            base64 += String.fromCharCode(data[i]);
          }
          audioObj.picture = `data:${data.format};base64,${window.btoa(base64)}`;
        }
        setMetadata(audioObj);
      },
    });

    return () => {
      URL.revokeObjectURL(src);
    };
  }, [audio]);

  return metadata ? (
    <div className={styles.audioWrapper}>
      <audio controls src={metadata.src}></audio>
      <div className={styles.metadata}>
        <div className={styles.metadata__textWrapper}>
          <p className={styles.metadata__text}>{metadata.title || 'Unknown'}</p>
          <p className={styles.metadata__text}>
            {metadata.artist || 'Unknown'}
          </p>
          <p className={styles.metadata__text}>{metadata.album || 'Unknown'}</p>
        </div>
        <div className={styles.metadata__imgWrapper}>
          <img src={metadata.picture || musicNote} alt="" />
        </div>
      </div>
    </div>
  ) : null;
}

AudioWrapper.propTypes = {
  audio: PropTypes.object,
};
