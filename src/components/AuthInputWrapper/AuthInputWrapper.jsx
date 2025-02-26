import { forwardRef, useId } from 'react';
import PropTypes from 'prop-types';
import styles from './AuthInputWrapper.module.css';

export const AuthInputWrapper = forwardRef(function AuthInputWrapper(
  {
    name,
    label,
    type,
    maxLength = '',
    handleBlur,
    handleChange,
    showError,
    err,
  },
  ref
) {
  const id = useId();

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        ref={ref}
        id={id}
        name={name}
        type={type}
        required
        maxLength={maxLength}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder=""
      />
      {showError && <p className={styles.authError}>{err}</p>}
    </div>
  );
});

AuthInputWrapper.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  showError: PropTypes.bool,
  err: PropTypes.string,
};
