import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

// The inline script in index.html already picked a theme (saved choice, else OS
// preference) and set `data-theme` on <html> before React mounted — that's what
// prevents a flash of the wrong colours on load. Read it back so React state
// starts in agreement with the DOM instead of guessing again.
function getInitialTheme() {
  if (typeof document !== 'undefined') {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'dark' || current === 'light') return current;
  }
  return 'light';
}

// Owns the light/dark theme: keeps <html data-theme> and localStorage in sync
// with React state, and exposes a `toggle` for the navbar button.
export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage can throw (private mode / storage disabled). The theme
      // still applies for this session; it just won't persist across reloads.
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle };
}
