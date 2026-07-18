import { useRef } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import { useStickyNav } from '../../hooks/useStickyNav.js';

// Home/hero section. Owns the refs the sticky-nav math needs (the header and
// the nav-wrapper) and passes the derived sticky/showLogo flags into Navbar.
// Navbar stays inside `.page-wrapper` because `.nav-wrapper` is position:fixed
// with no `top`, so its resolved position depends on its static DOM location.
export default function Home() {
  const headerRef = useRef(null);
  const navWrapperRef = useRef(null);
  const { sticky, showLogo } = useStickyNav(headerRef, navWrapperRef);

  return (
    <section className="home" id="home">
      <div className="page-wrapper">
        <Navbar
          sticky={sticky}
          showLogo={showLogo}
          navWrapperRef={navWrapperRef}
        />
        <h1 ref={headerRef} className="header lh-1-27">
          <div className="header-text-first fs-lg-70 fs-md-50 fs-30 fw-900">
            S<span>a</span>mir
          </div>
          <div className="header-text-last fs-lg-70 fs-md-50 fs-30 fw-900">
            W<span>a</span>tts
          </div>
        </h1>
        <div className="profile fs-lg-24 fs-md-20 fs-18">
          Senior Software Engineer
        </div>
        <div className="underLine"></div>
      </div>
    </section>
  );
}
