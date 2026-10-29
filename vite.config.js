import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // The design's images and fonts are served from /assets (public/assets),
    // so the bundler's own output goes to /build to keep the two apart.
    assetsDir: 'build',
  },
});
