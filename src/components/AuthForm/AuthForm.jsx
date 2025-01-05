import { useFetcher } from 'react-router';
import PropTypes from 'prop-types';

export function AuthForm({ children, btnText, intent }) {
  const fetcher = useFetcher();
  const err = fetcher.data;

  return (
    <fetcher.Form method="POST">
      {children}
      <button
        name="intent"
        value={intent}
        disabled={fetcher.state === 'submitting'}
      >
        {btnText}
      </button>
      {err && <p>{err}</p>}
    </fetcher.Form>
  );
}

AuthForm.propTypes = {
  children: PropTypes.node,
  btnText: PropTypes.string,
  intent: PropTypes.string,
};
