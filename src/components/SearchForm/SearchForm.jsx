import Search from '../../assets/icons/search.svg?react';
import { useId, useRef, useEffect } from 'react';
import styles from './SearchForm.module.css';
import { Form, useSearchParams } from 'react-router';

export function SearchFrom() {
  const id = useId();
  const [search] = useSearchParams();
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current.value = decodeURIComponent(search)
      .slice(2)
      .replaceAll('+', ' ');
  }, [search]);
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
          ref={searchRef}
          name="q"
          className={styles.searchInput}
          id={id}
          type="search"
          placeholder="Search Rumblr"
          maxLength={140}
        />
      </Form>
    </search>
  );
}
