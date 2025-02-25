import { DashNav } from '../../components/DashNav/DashNav';
import { SideNav } from '../../components/SideNav/SideNav';
import { ModalBackdrop } from '../../components/ModalBackdrop/ModalBackdrop';
import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { SearchFrom } from '../../components/SearchForm/SearchForm';
import { HeaderLinks } from '../../components/HeaderLinks/HeaderLinks';
import { PostForm } from '../../components/PostForm/PostForm';
import { Outlet, ScrollRestoration } from 'react-router';
import { useNavigation } from 'react-router';
import { Loading } from '../../components/Loading/Loading';

export function Dashboard() {
  const [showSideNav, setShowSideNav] = useState(false);
  const [postModal, setPostModal] = useState('');
  const navigation = useNavigation();

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
      <ScrollRestoration />
      <header
        inert={showSideNav || postModal ? '' : null}
        className={`${styles.header}`}
      >
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
        <main
          className={styles.main}
          inert={showSideNav || postModal ? '' : null}
        >
          {navigation.state === 'loading' ? <Loading /> : <Outlet />}
        </main>
        {/* <footer inert={showSideNav || postModal ? '' : null}>
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
