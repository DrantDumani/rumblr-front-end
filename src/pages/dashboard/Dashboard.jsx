import { DashNav } from '../../components/DashNav/DashNav';
import { SideNav } from '../../components/SideNav/SideNav';
import { ModalBackdrop } from '../../components/ModalBackdrop/ModalBackdrop';
import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { SearchFrom } from '../../components/SearchForm/SearchForm';
import { HeaderLinks } from '../../components/HeaderLinks/HeaderLinks';
import { useLoaderData } from 'react-router';
import { Post } from '../../components/Post/Post';
import { PostForm } from '../../components/PostForm/PostForm';

export function Dashboard() {
  const postData = useLoaderData();
  const [showSideNav, setShowSideNav] = useState(false);
  const [posts, setPosts] = useState(postData);
  const [postModal, setPostModal] = useState('');

  const togglePostModal = (str) => setPostModal(str);

  const showNav = () => setShowSideNav(true);
  const hideNav = () => setShowSideNav(false);

  // state for showing / hiding part of the header
  const [hideHeaderOptions, setHideHeaderOptions] = useState(false);

  useEffect(() => {
    let scrollPos = 0;

    const toggleNavOptions = () => {
      if (window.scrollY > scrollPos) {
        setHideHeaderOptions(true);
      } else {
        setHideHeaderOptions(false);
      }

      scrollPos = window.scrollY;
    };

    window.addEventListener('scroll', toggleNavOptions);

    return () => window.removeEventListener('scroll', toggleNavOptions);
  }, []);

  return (
    <>
      <header inert={showSideNav ? '' : null} className={`${styles.header}`}>
        <DashNav showNav={showNav} hideOptions={hideHeaderOptions} />
      </header>
      <div
        inert={hideHeaderOptions ? '' : null}
        className={`${styles.mobile_topBar} ${hideHeaderOptions ? styles['mobile_topBar--scrollHide'] : ''} `}
      >
        <div className={styles.searchWrapper}>
          <SearchFrom />
        </div>
        <nav aria-label="mobileNav">
          <HeaderLinks />
        </nav>
      </div>

      {(showSideNav || postModal) && <ModalBackdrop />}
      <div
        className={styles['sideBar--mobileOnly']}
        inert={showSideNav ? null : ''}
      >
        <SideNav
          showMobileSideNav={showSideNav}
          togglePostModal={togglePostModal}
          hideMobileSideNav={hideNav}
        />
      </div>

      <div className={styles.flexWrapper}>
        <div className={styles.sideBarWrapper}>
          <SideNav togglePostModal={togglePostModal} />
        </div>
        <main className={styles.main} inert={showSideNav ? '' : null}>
          <div className={styles.postListWrapper}>
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </main>
        {/* <footer inert={showSideNav ? '' : null}>
          Footer stuff but we made the post extra long so you could see stuff
          when the menu is up
        </footer> */}
      </div>
      {postModal && (
        <PostForm togglePostModal={togglePostModal} postModal={postModal} />
      )}
    </>
  );
}
