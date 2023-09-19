import type { UserConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { kitbook } from 'kitbook/plugins/vite';
import UnoCSS from 'unocss/vite';

const config: UserConfig = {
  plugins: [
    UnoCSS({
      mode: 'svelte-scoped',
    }),
    kitbook(),
    sveltekit()
  ],
  define: {
    'import.meta.vitest': false,
    'import.meta.env.VERCEL_ANALYTICS_ID': JSON.stringify(process.env.VERCEL_ANALYTICS_ID),
  },
  optimizeDeps: {
    exclude: ['linkify-html'],
  },
  build: {
    target: 'es2015',
  },
  server: {
    port: 3000,
  },
};

export default config;
