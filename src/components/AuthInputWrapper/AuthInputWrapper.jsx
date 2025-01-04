import { forwardRef, useId } from 'react';
import PropTypes from 'prop-types';

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
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        required
        maxLength={maxLength}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {showError && <p>{err}</p>}
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
