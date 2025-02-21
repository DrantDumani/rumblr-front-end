import styles from './HeaderImgWrapper.module.css';
import PropTypes from 'prop-types';
import def_header from '../../assets/images/default_header.png';

export function HeaderImgWrapper({ imgSrc, children }) {
  return (
    <div className={styles.imgWrapper}>
      <img
        className={styles.imgWrapper__img}
        src={imgSrc || def_header}
        alt=""
      />
      {children}
    </div>
  );
}

HeaderImgWrapper.propTypes = {
  imgSrc: PropTypes.string,
  children: PropTypes.any,
};
