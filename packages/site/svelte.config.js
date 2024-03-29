import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.composition'],
  preprocess: [
    preprocess(),
  ],

  kit: {
    adapter: adapter(),
  },

  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-'))
      return;

    handler(warning);
  },

  vitePlugin: {
    experimental: {
      inspector: {
        holdMode: true,
      }
    },
  },
};

export default config;
