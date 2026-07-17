import GradientBar from './GradientBar.jsx';

// Nav links; the first is the active one on load. Phase 2 makes `active` derive
// from state instead of being hard-coded here.
const links = [
  { label: 'HOME', href: '#' },
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'WORK', href: '#work' },
  { label: 'CONTACT', href: '#contact' },
];

// Static navbar (no toggling yet). Preserves the exact structure the CSS keys
// off: id="mobile-menu" on the toggle and three sibling `.bar` spans for the
// hamburger animation (see CLAUDE.md §4).
export default function Navbar() {
  return (
    <div className="nav-wrapper">
      <GradientBar />
      <div className="navbar">
        <p className="logo fw-600 fs-16 m-0">Samir Watts</p>
        <div className="menu-toggle" id="mobile-menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className="nav">
          {links.map((link, i) => (
            <li key={link.label} className="nav-item fw-bolder fs-md-12 ls-1-6">
              <a href={link.href} {...(i === 0 ? { active: '' } : {})}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
