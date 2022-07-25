import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  envDir: '../../',
  define: {
    'import.meta.vitest': false,
  },
  server: {
    port: 3010,
    hmr: { // enables Gitpod HMR
      clientPort: process.env.HMR_HOST ? 443 : 3010,
      host: process.env.HMR_HOST
        ? process.env.HMR_HOST.substring('https://'.length)
        : 'localhost',
    },
  },
  test: {
    plugins: [svelte({ hot: !process.env.VITEST })],
    globals: true,
    includeSource: ['src/**/*.ts'],
  },
};

export default config;
