import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
// Extends Vitest's `expect` with jest-dom matchers (toBeInTheDocument,
// toHaveClass, etc.). The /vitest entrypoint targets Vitest's expect.
import '@testing-library/jest-dom/vitest';

// Unmount rendered components between tests so they don't leak into each other.
afterEach(() => {
  cleanup();
});

// jsdom doesn't implement IntersectionObserver, which the Navbar scroll-spy and
// the skill-bar hook rely on. A no-op stub lets those components mount in tests.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
globalThis.IntersectionObserver = IntersectionObserverStub;
