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
    hmr: {
      // enables Gitpod HMR
      clientPort: process.env.HMR_HOST ? 443 : 3000,
      host: process.env.HMR_HOST ? process.env.HMR_HOST.substring('https://'.length) : 'localhost',
    },

    // From https://flaming.codes/en/posts/setup-hmr-for-sveltekit-with-gitpod and https://mattjennings.io/blog/how-to-enable-hmr-for-sveltekit-on-gitpod
    // hmr: process.env.GITPOD_WORKSPACE_URL
    // 	? {
    // 		// removes the protocol and replaces it with the port we're connecting to
    // 		host: process.env.GITPOD_WORKSPACE_URL.replace('https://', '3000-'),
    // 		protocol: 'wss',
    // 		clientPort: 443
    // 	}
    // 	: true
  },
};

export default config;
