import { DashNav } from '../../components/DashNav/DashNav';
import { useState } from 'react';

export function Dashboard() {
  const [showSideNav, setShowSideNav] = useState(false);

  const showNav = () => setShowSideNav(true);
  const hideNav = () => setShowSideNav(false);
  // header, main, footer
  // header will contain a nav
  // there will be another nav that acts as side nav options
  // main content holds the post list and side nav, which overflows.
  // should there even be a footer
  // the footer should go underneath the main. Sure. Why not
  return (
    <>
      <header>
        <DashNav showNav={showNav} />
      </header>
      {/* Put the side nav in main so I can put them in a flex box or something */}
      <nav>Side nav stuff</nav>
      <main>Post list, with post options on desktop</main>
      <footer>Footer stuff</footer>
    </>
  );
}
