import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom domain served at the root (sameerwatts.com) -> keep base '/'.
// A base prefix is only needed for user.github.io/repo project sites.
export default defineConfig({
  base: '/',
  plugins: [react()],
});
