import styles from './HeaderImgWrapper.module.css';
import PropTypes from 'prop-types';

export function HeaderImgWrapper({ imgSrc, children }) {
  return (
    <div className={styles.imgWrapper}>
      <img className={styles.imgWrapper__img} src={imgSrc} alt="" />
      {children}
    </div>
  );
}

HeaderImgWrapper.propTypes = {
  imgSrc: PropTypes.string,
  children: PropTypes.any,
};
