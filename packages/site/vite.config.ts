import type { UserConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { kitbook } from 'kitbook/plugins/vite';
import UnoCSS from 'unocss/vite';
import kitbookConfig from './kitbook.config';

const config: UserConfig = {
  plugins: [
    UnoCSS({
      mode: 'svelte-scoped',
    }),
    kitbook(kitbookConfig),
    sveltekit()
  ],
  define: getReplacements(),
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

function getReplacements() {
  if (typeof process !== 'undefined' && process.env.VERCEL_ANALYTICS_ID) {
    return {
      'import.meta.vitest': false,
      'REPLACED_WITH_VERCEL_ANALYTICS_ID': process.env.VERCEL_ANALYTICS_ID,
    }
  }

  return {
    'import.meta.vitest': false,
  }
}
