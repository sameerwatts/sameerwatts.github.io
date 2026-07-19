import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Experience from './components/Experience/Experience.jsx';
import Work from './components/Work/Work.jsx';
import Contact from './components/Contact/Contact.jsx';

// Composes the 5 sections in the same order/nesting as the old index.html:
// About/Experience/Work live inside `.details`; Contact sits outside it.
export default function App() {
  return (
    <>
      {/* First focusable element on the page: lets keyboard users jump past the
          nav straight to the main content. Hidden off-screen until focused. */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Home />
      <div id="main-content" tabIndex={-1} className="details">
        <About />
        <Experience />
        <Work />
      </div>
      <Contact />
    </>
  );
}
