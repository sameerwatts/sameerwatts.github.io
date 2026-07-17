import { useEffect, useRef, useState } from 'react';

// IntersectionObserver wrapper. Returns [ref, inView]; attach ref to the element
// to observe. Replaces the old scrollAnimation() offset math for skill bars —
// inView flips true while the element is in the viewport, false when it leaves
// (either direction), mirroring the reset-on-scroll-past behaviour.
export function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}
