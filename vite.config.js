/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Custom domain served at the root (sameerwatts.com) -> keep base '/'.
// A base prefix is only needed for user.github.io/repo project sites.
export default defineConfig({
  base: '/',
  plugins: [react()],
  // Use the automatic JSX runtime so .jsx test files don't need React in scope
  // (the components themselves already rely on it via @vitejs/plugin-react).
  esbuild: { jsx: 'automatic' },
  // Component/unit tests (Vitest + React Testing Library). jsdom gives the
  // components a DOM to render into; setup.js wires up matchers and stubs the
  // browser APIs jsdom lacks (IntersectionObserver).
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: false,
  },
});
