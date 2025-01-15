import Search from '../../assets/icons/search.svg?react';
import { useId } from 'react';
import styles from './SearchForm.module.css';
import { Form } from 'react-router';

export function SearchFrom() {
  const id = useId();
  return (
    <search>
      <Form className={styles.searchForm}>
        <label
          aria-labelledby="searchTag"
          htmlFor={id}
          className={styles.searchLabel}
        >
          <Search title="searchTag" />
        </label>
        <input className={styles.searchInput} id={id} type="search" />
      </Form>
    </search>
  );
}
