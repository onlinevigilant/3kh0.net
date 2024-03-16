import vue from '@vitejs/plugin-vue'
import Sitemap from 'vite-plugin-sitemap'
import { defineConfig } from 'vite'
import { join, parse, resolve } from "path";

// Define your entry points
const entryPoints = getEntryPoints("index.html");

// Transform the entry points into route paths
const dynamicRoutes = Object.keys(entryPoints).map(key => `/${key}`);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Sitemap({
      hostname: 'https://3kh0.net/',
      lastmod: new Date(),
      generateRobotsTxt: true,
      dynamicRoutes
    })
  ],
  alias: {
    "~": __dirname,
  },
  build: {
    outDir: 'dist',
    base: '/',
    minify: 'esbuild',
    sourcemap: 'true',
    rollupOptions: {
      input: entryPoints,
    },
  },
})

function getEntryPoints(...paths) {
  const entries = paths.map(parse).map(entry => {
    const { dir, base, name, ext } = entry;
    const key = join(dir, name);
    const path = resolve(__dirname, dir, base);
    return [key, path];
  });
  
  const config = Object.fromEntries(entries);
  return config;
}