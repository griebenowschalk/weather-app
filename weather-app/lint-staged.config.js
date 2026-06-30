/** @type {import('lint-staged').Config} */
export default {
	'*.{js,ts,svelte.ts}': 'eslint --fix',
	'*.svelte': ['eslint --fix', 'stylelint --fix'],
	'*.scss': 'stylelint --fix'
};
