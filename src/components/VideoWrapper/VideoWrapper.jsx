import PropTypes from 'prop-types';
import styles from './VideoWrapper.module.css';

export function VideoWrapper({ videoURL }) {
  return (
    <video className={styles.video} controls>
      <source src={videoURL} />
    </video>
  );
}

VideoWrapper.propTypes = {
  videoURL: PropTypes.string,
};
