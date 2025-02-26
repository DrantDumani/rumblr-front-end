import { AuthForm } from '../AuthForm/AuthForm';
import { AuthInputWrapper } from '../AuthInputWrapper/AuthInputWrapper';
import { useRef, useState } from 'react';

export function Register() {
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const unameRef = useRef(null);
  const confirmPwRef = useRef(null);

  const [showEmailErr, setShowEmailErr] = useState(false);
  const [showPwErr, setShowPwErr] = useState(false);
  const [showNameErr, setShowNameErr] = useState(false);
  const [showConfirmPwErr, setShowConfirmPwErr] = useState(false);

  const validateEmail = () => {
    const emailValidity = emailRef.current.validity;
    setShowEmailErr(emailValidity.typeMismatch || emailValidity.valueMissing);
  };

  const validatePw = () => {
    const pwValidity = pwRef.current.validity;
    setShowPwErr(pwValidity.valueMissing);
  };

  const validateUsername = () => {
    const nameValidity = unameRef.current.validity;
    setShowNameErr(nameValidity.valueMissing);
  };

  const validateConfirmPw = () => {
    const confirmPwValidity = confirmPwRef.current.validity;
    setShowConfirmPwErr(
      confirmPwValidity.valueMissing ||
        confirmPwRef.current.value !== pwRef.current.value
    );
  };

  const removeErrOnValidation = (showErr, toggleFn) => {
    if (showErr) {
      toggleFn();
    }
  };

  return (
    <AuthForm btnText={'Sign Up'} intent={'register'}>
      <h2>Register</h2>
      <AuthInputWrapper
        name="username"
        label="Username"
        type="text"
        err="Username must be between 1 and 20 characters"
        maxLength={20}
        ref={unameRef}
        showError={showNameErr}
        handleBlur={validateUsername}
        handleChange={() => {
          removeErrOnValidation(showNameErr, validateUsername);
        }}
      />
      <AuthInputWrapper
        name="email"
        label="Email"
        type="email"
        err="Please enter a valid email"
        maxLength={320}
        ref={emailRef}
        showError={showEmailErr}
        handleBlur={validateEmail}
        handleChange={() => removeErrOnValidation(showEmailErr, validateEmail)}
      />
      <AuthInputWrapper
        name="pw"
        label="Password"
        type="password"
        err="Please enter a password"
        ref={pwRef}
        showError={showPwErr}
        handleBlur={() => {
          validatePw();
          validateConfirmPw();
        }}
        handleChange={() => {
          removeErrOnValidation(showPwErr, validatePw);
          removeErrOnValidation(showConfirmPwErr, validateConfirmPw);
        }}
      />
      <AuthInputWrapper
        name="confirmPw"
        label="Confirm Password"
        type="password"
        err="Passwords must match"
        ref={confirmPwRef}
        showError={showConfirmPwErr}
        handleBlur={validateConfirmPw}
        handleChange={() =>
          removeErrOnValidation(showConfirmPwErr, validateConfirmPw)
        }
      />
    </AuthForm>
  );
}
