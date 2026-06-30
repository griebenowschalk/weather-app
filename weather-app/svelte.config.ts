import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in Svelte 6.
		runes: ({ filename }: { filename: string }) =>
			filename.split(/[/\\]/).includes('node_modules') ? undefined : true
	},
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$scss: 'src/scss',
			'mock/*': 'src/_mock/*'
		}
	}
};

export default config;
