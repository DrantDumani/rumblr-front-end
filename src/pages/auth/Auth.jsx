import { Login } from '../../components/Login/Login';
import { Register } from '../../components/Register/Register';
import { Footer } from '../../components/Footer/Footer';
import { useState } from 'react';
import styles from './Auth.module.css';

export function Auth() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <>
      <header className={styles.authHeader}>
        <h1 className={styles.titleLogo}>Rumblr</h1>
      </header>
      <main className={styles.authMain}>
        {showLoginForm ? (
          <div>
            <Login />
            <p className={styles.formToggle}>
              Don&apos;t have a account? Click here to{' '}
              <button
                className={styles.toggleBtn}
                onClick={() => setShowLoginForm(false)}
              >
                Sign Up
              </button>
              !
            </p>
          </div>
        ) : (
          <div>
            <Register />
            <p className={styles.formToggle}>
              Already have an account? Click here to{' '}
              <button
                className={styles.toggleBtn}
                onClick={() => setShowLoginForm(true)}
              >
                Log In
              </button>
              !
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
