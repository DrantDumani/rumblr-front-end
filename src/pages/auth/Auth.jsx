import { Login } from '../../components/Login/Login';
import { Register } from '../../components/Register/Register';
import { Footer } from '../../components/Footer/Footer';
import { useState } from 'react';

export function Auth() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <>
      <header>
        <h1>Rumblr</h1>
      </header>
      <main>
        {showLoginForm ? (
          <>
            <Login />
            <p>
              Don&apos;t have a account? Click here to{' '}
              <button onClick={() => setShowLoginForm(false)}>Sign Up</button>!
            </p>
          </>
        ) : (
          <>
            <Register />
            <p>
              Already have an account? Click here to{' '}
              <button onClick={() => setShowLoginForm(true)}>Log In</button>!
            </p>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
