import type { UserConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
// import { svelte } from '@sveltejs/vite-plugin-svelte';
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
  test: {
    // plugins: [svelte({ hot: !process.env.VITEST })],
    globals: true,
    includeSource: ['src/**/*.ts'],
    exclude: [...configDefaults.exclude, '**/tests/**'],
  },
  server: {
    port: 3000,
  },
};

export default config;
