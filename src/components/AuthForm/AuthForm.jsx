import { useFetcher } from 'react-router';
import PropTypes from 'prop-types';
import styles from './AuthForm.module.css';
import { Loading } from '../../components/Loading/Loading';

export function AuthForm({ children, btnText, intent }) {
  const fetcher = useFetcher();
  const guestFetcher = useFetcher();
  const err = fetcher.data;

  return (
    <>
      <div className={styles.authFormWrapper}>
        <fetcher.Form className={styles.authForm} method="POST">
          {children}
          <button
            className={styles.authSubmit}
            name="intent"
            value={intent}
            disabled={
              fetcher.state === 'submitting' ||
              guestFetcher.state === 'submitting'
            }
          >
            {btnText}
          </button>
        </fetcher.Form>
        <guestFetcher.Form method="POST">
          <button
            name="intent"
            value="guest"
            className={styles.authSubmit}
            disabled={
              fetcher.state === 'submitting' ||
              guestFetcher.state === 'submitting'
            }
          >
            Log In as Guest
          </button>
        </guestFetcher.Form>
        {err && <p>{err}</p>}
      </div>
      {(fetcher.state === 'submitting' ||
        guestFetcher.state === 'submitting') && <Loading />}
    </>
  );
}

AuthForm.propTypes = {
  children: PropTypes.node,
  btnText: PropTypes.string,
  intent: PropTypes.string,
};
