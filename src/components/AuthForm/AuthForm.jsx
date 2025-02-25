import { useFetcher } from 'react-router';
import PropTypes from 'prop-types';
import styles from './AuthForm.module.css';
import { Loading } from '../../components/Loading/Loading';

export function AuthForm({ children, btnText, intent }) {
  const fetcher = useFetcher();
  const err = fetcher.data;

  return (
    <>
      <fetcher.Form className={styles.authForm} method="POST">
        {children}
        <button
          className={styles.authSubmit}
          name="intent"
          value={intent}
          disabled={fetcher.state === 'submitting'}
        >
          {btnText}
        </button>
        {err && <p>{err}</p>}
      </fetcher.Form>
      {fetcher.state === 'submitting' && <Loading />}
    </>
  );
}

AuthForm.propTypes = {
  children: PropTypes.node,
  btnText: PropTypes.string,
  intent: PropTypes.string,
};
