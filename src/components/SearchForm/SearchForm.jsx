import Search from '../../assets/icons/search.svg?react';
import { useId } from 'react';
import styles from './SearchForm.module.css';
import { Form } from 'react-router';

export function SearchFrom() {
  const id = useId();
  return (
    <search>
      <Form action="/search" className={styles.searchForm} method="get">
        <label
          aria-labelledby="searchTag"
          htmlFor={id}
          className={styles.searchLabel}
        >
          <Search title="searchTag" />
        </label>
        <input
          name="q"
          className={styles.searchInput}
          id={id}
          type="search"
          placeholder="Search Rumblr"
        />
      </Form>
    </search>
  );
}
