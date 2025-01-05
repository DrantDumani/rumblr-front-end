import { AuthForm } from '../AuthForm/AuthForm';
import { AuthInputWrapper } from '../AuthInputWrapper/AuthInputWrapper';
import { useRef, useState } from 'react';

export function Login() {
  const emailRef = useRef(null);
  const pwRef = useRef(null);

  const [showEmailErr, setShowEmailErr] = useState(false);
  const [showPwErr, setShowPwErr] = useState(false);

  const validateEmail = () => {
    const emailValidity = emailRef.current.validity;
    setShowEmailErr(emailValidity.typeMismatch || emailValidity.valueMissing);
  };

  const validatePw = () => {
    const pwValidity = pwRef.current.validity;
    setShowPwErr(pwValidity.valueMissing);
  };

  const removeErrOnValidation = (showErr, toggleFn) => {
    if (showErr) {
      toggleFn();
    }
  };

  return (
    <AuthForm btnText={'Log In'} intent={'login'}>
      <h2>Log In</h2>
      <AuthInputWrapper
        name="email"
        label="Email"
        type="email"
        err="Please enter a valid email"
        maxLength={320}
        ref={emailRef}
        showError={showEmailErr}
        handleBlur={validateEmail}
        handleChange={() => {
          removeErrOnValidation(showEmailErr, validateEmail);
        }}
      />
      <AuthInputWrapper
        name="pw"
        label="Password"
        type="password"
        err="Please enter a password"
        ref={pwRef}
        showError={showPwErr}
        handleBlur={validatePw}
        handleChange={() => removeErrOnValidation(showPwErr, validatePw)}
      />
    </AuthForm>
  );
}
