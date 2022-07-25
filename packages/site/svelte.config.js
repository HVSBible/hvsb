import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import deepWind from "svelte-deep-wind-preprocess";
import { windi } from "svelte-windicss-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	experimental: {
		inspector: true
	},

	preprocess: [
		preprocess(),
		deepWind(),
		windi({
			configPath: './windi.config.js',
			experimental: {
				icons: {
					prefix: 'i-',
					extraProperties: {
						'display': 'inline-block',
						'vertical-align': 'middle',
					}
				}
			}
		}),
	],

	kit: {
		adapter: adapter(),
	}
};

export default config;

// see https://github.com/vitejs/vite/pull/677 for GitHub Codespaces if desiring