import { useEffect, useState } from 'react';

// Sticky navbar + logo reveal, ported from the old scrollEventsHandler:
//   header.offsetTop - scrollY + 10 < navWrapper.clientHeight  -> sticky
//   160 - scrollY < 30                                         -> showLogo
// Measures live geometry via refs so it stays correct across breakpoints.
export function useStickyNav(headerRef, navWrapperRef) {
  const [sticky, setSticky] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const header = headerRef.current;
      const navWrapper = navWrapperRef.current;
      if (!header || !navWrapper) return;
      if (header.offsetTop - window.scrollY + 10 < navWrapper.clientHeight) {
        setSticky(true);
        setShowLogo(160 - window.scrollY < 30);
      } else {
        setSticky(false);
        setShowLogo(false);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, [headerRef, navWrapperRef]);

  return { sticky, showLogo };
}
