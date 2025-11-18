import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const routes = ['/', '/about', '/partnership', '/hajj', '/umrah', '/contact', '/support'];

const createOutputPath = (route) => {
  if (route === '/') {
    return path.join(distDir, 'index.html');
  }
  return path.join(distDir, route.replace(/^\//, ''), 'index.html');
};

const getBaseUrl = (server) => {
  const resolved = server?.resolvedUrls?.local?.[0] || server?.resolvedUrls?.network?.[0];
  if (resolved) {
    return resolved.replace(/\/$/, '');
  }

  const { host, port } = server.config.preview;
  const hostname = host === true ? '127.0.0.1' : host || '127.0.0.1';
  return `http://${hostname}:${port || 4173}`;
};

(async () => {
  const previewServer = await preview({
    build: { outDir: distDir },
    preview: {
      host: '127.0.0.1',
      port: 4173,
      open: false
    },
    logLevel: 'silent'
  });

  const baseUrl = getBaseUrl(previewServer);
  const browser = await puppeteer.launch({ headless: 'new' });

  try {
    for (const route of routes) {
      const page = await browser.newPage();
      const url = `${baseUrl}${route}`;
      await page.goto(url, { waitUntil: 'networkidle0' });
      await page.waitForFunction(() => document.title && document.title.length > 0, { timeout: 15000 });
      const html = await page.evaluate(() => document.documentElement.outerHTML);

      const outputPath = createOutputPath(route);
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, html, 'utf8');
      await page.close();
      console.log(`Prerendered ${route}`);
    }
  } catch (error) {
    console.error('Prerender failed:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
    await previewServer.httpServer.close();
  }
})();
