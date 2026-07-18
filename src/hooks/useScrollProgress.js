import { useEffect, useState } from 'react';

// Returns scroll progress as a 0–100 number (old scrollIndicator()).
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const el = document.documentElement;
      const height = el.scrollHeight - el.clientHeight;
      setProgress(height > 0 ? (el.scrollTop / height) * 100 : 0);
      ticking = false;
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
  }, []);

  return progress;
}
