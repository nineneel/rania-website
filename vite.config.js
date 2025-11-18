import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import prerender from '@prerenderer/rollup-plugin';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';

const projectRootDir = fileURLToPath(new URL('.', import.meta.url));
const prerenderRoutes = ['/', '/about', '/partnership', '/hajj', '/umrah', '/contact', '/support'];

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    command === 'build' &&
      prerender({
        staticDir: resolve(projectRootDir, 'dist'),
        routes: prerenderRoutes,
        renderer: new PuppeteerRenderer({
          renderAfterTime: 2000
        })
      })
  ].filter(Boolean),
  base: process.env.VITE_BASE_PATH || '/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js']
  }
}));
