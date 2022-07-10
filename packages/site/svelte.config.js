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
		vite: {
			envDir: '../../',
			build: {
				target: 'es2015'
			},
			define: {
				'import.meta.vitest': false,
			},
			server: {
				hmr: { // enables Gitpod HMR
					clientPort: process.env.HMR_HOST ? 443 : 3000,
					host: process.env.HMR_HOST
						? process.env.HMR_HOST.substring('https://'.length)
						: 'localhost',
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
		}
	}
};

export default config;

// see https://github.com/vitejs/vite/pull/677 for GitHub Codespaces if desiring