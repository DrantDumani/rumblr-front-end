import { read } from 'jsmediatags';
import { useEffect, useState } from 'react';
import styles from './AudioWrapper.module.css';
import PropTypes from 'prop-types';
import musicNote from '../../assets/icons/music-note.svg';

export function AudioWrapper({ audioURL = '', audioFile = null }) {
  const [dataObj, setdataObj] = useState({});

  useEffect(() => {
    const readDataFrom = audioFile || audioURL;
    read(readDataFrom, {
      onSuccess: ({ tags }) => {
        const newDataObj = {};
        newDataObj.title = tags.title;
        newDataObj.album = tags.album;
        newDataObj.artist = tags.artist;

        if (tags.picture) {
          const { data } = tags.picture;
          let base64 = '';
          for (let i = 0; i < data.length; i++) {
            base64 += String.fromCharCode(data[i]);
          }
          newDataObj.picture = `data:${data.format};base64,${window.btoa(base64)}`;
        }
        setdataObj(newDataObj);
      },
      onError: (e) => console.log(e),
    });
  }, [audioFile, audioURL]);

  return (
    <div className={styles.audioWrapper}>
      <audio controls src={audioURL}></audio>
      <div className={styles.metadata}>
        <div className={styles.metadata__textWrapper}>
          <p className={styles.metadata__text}>{dataObj.title || 'Unknown'}</p>
          <p className={styles.metadata__text}>{dataObj.artist || 'Unknown'}</p>
          <p className={styles.metadata__text}>{dataObj.album || 'Unknown'}</p>
        </div>
        <div className={styles.metadata__imgWrapper}>
          <img src={dataObj.picture || musicNote} alt="" />
        </div>
      </div>
    </div>
  );
}

AudioWrapper.propTypes = {
  audioURL: PropTypes.string,
  audioFile: PropTypes.object,
};
