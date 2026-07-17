import { useState } from 'react';
import GradientBar from './GradientBar.jsx';

const links = [
  { label: 'HOME', href: '#' },
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'WORK', href: '#work' },
  { label: 'CONTACT', href: '#contact' },
];

// `sticky` / `showLogo` come from useStickyNav (owned by Home, which also holds
// the header ref). `navWrapperRef` lets Home measure this element's height.
// Local state: which link is active, and whether the mobile menu is open.
export default function Navbar({ sticky, showLogo, navWrapperRef }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Clicking a link activates it AND closes the mobile menu (old
  // navLinkClickHandler removed both `mobile-nav` and `is-active`).
  const handleLinkClick = (i) => {
    setActiveIndex(i);
    setMobileOpen(false);
  };

  return (
    <div ref={navWrapperRef} className={`nav-wrapper${sticky ? ' active' : ''}`}>
      <GradientBar />
      <div className="navbar">
        <p className={`logo fw-600 fs-16 m-0${showLogo ? ' showLogo' : ''}`}>Samir Watts</p>
        <div
          className={`menu-toggle${mobileOpen ? ' is-active' : ''}`}
          id="mobile-menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`nav${mobileOpen ? ' mobile-nav' : ''}`}>
          {links.map((link, i) => (
            <li key={link.label} className="nav-item fw-bolder fs-md-12 ls-1-6">
              <a
                href={link.href}
                {...(activeIndex === i ? { active: '' } : {})}
                onClick={() => handleLinkClick(i)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
