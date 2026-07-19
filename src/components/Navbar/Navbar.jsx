import { useEffect, useState } from 'react';
import GradientBar from './GradientBar.jsx';
import useTheme from '../../hooks/useTheme.js';

// Sun (shown in dark mode → click to go light) and moon (shown in light mode →
// click to go dark). Both use `currentColor` so the icon inherits the navbar's
// text colour: light over the hero photo, dark once the navbar turns sticky.
function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// `section` is the id of the page section each link points to (HOME's href is
// '#', not '#home', so the section id is tracked separately for scroll-spy).
const links = [
  { label: 'HOME', href: '#', section: 'home' },
  { label: 'ABOUT', href: '#about', section: 'about' },
  { label: 'EXPERIENCE', href: '#experience', section: 'experience' },
  { label: 'WORK', href: '#work', section: 'work' },
  { label: 'CONTACT', href: '#contact', section: 'contact' },
];

// `sticky` / `showLogo` come from useStickyNav (owned by Home, which also holds
// the header ref). `navWrapperRef` lets Home measure this element's height.
// Local state: which link is active, and whether the mobile menu is open.
export default function Navbar({ sticky, showLogo, navWrapperRef }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme, toggle: toggleTheme } = useTheme();

  // Clicking a link activates it AND closes the mobile menu (old
  // navLinkClickHandler removed both `mobile-nav` and `is-active`).
  const handleLinkClick = (i) => {
    setActiveIndex(i);
    setMobileOpen(false);
  };

  // Lock page scroll while the mobile menu is open so the page can't scroll
  // behind the full-screen menu. Same approach as the work popups, reusing the
  // shared `.scroll-locked` class from style.css.
  useEffect(() => {
    if (!mobileOpen) return;
    const root = document.documentElement;
    root.classList.add('scroll-locked');
    return () => root.classList.remove('scroll-locked');
  }, [mobileOpen]);

  // Scroll-spy: highlight the nav link for whichever section is in the middle of
  // the viewport, so the active link tracks scrolling (not just clicks). The
  // rootMargin leaves a ~10% band centred vertically; a section counts as active
  // while it overlaps that band. When two overlap (mid-transition) the earlier
  // one in document order wins.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.section))
      .filter(Boolean);
    if (sections.length === 0) return;

    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const idx = links.findIndex((l) => visible.has(l.section));
        if (idx !== -1) setActiveIndex(idx);
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={navWrapperRef}
      className={`nav-wrapper${sticky ? ' active' : ''}`}
    >
      <GradientBar />
      <div className="navbar">
        <p className={`logo fw-600 fs-16 m-0${showLogo ? ' showLogo' : ''}`}>
          Samir Watts
        </p>
        <button
          type="button"
          className={`menu-toggle${mobileOpen ? ' is-active' : ''}`}
          id="mobile-menu"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul
          id="primary-navigation"
          className={`nav${mobileOpen ? ' mobile-nav' : ''}`}
        >
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
      {/* Absolutely positioned (see navbarStyle.css) so it sits at the navbar
          edge without disturbing the hand-tuned navbar grid or the hamburger. */}
      <button
        type="button"
        className="theme-toggle"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        onClick={toggleTheme}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}
