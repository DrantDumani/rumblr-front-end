import { Link } from 'react-router';
import styles from './Error.module.css';
import { useNavigation } from 'react-router';
import { Loading } from '../../components/Loading/Loading';

export function Error() {
  const navigation = useNavigation();
  return navigation.state !== 'loading' ? (
    <div className={styles.errorWrapper}>
      <h1>An unexpected error has occurred</h1>
      <p>
        Return to the{' '}
        <Link className={styles.errorLink} to={'/'}>
          Dashboard
        </Link>
      </p>
    </div>
  ) : (
    <div className={styles.errorLoader}>
      <Loading />
    </div>
  );
}
