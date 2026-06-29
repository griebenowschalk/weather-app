/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard-scss'],
	overrides: [
		{
			files: ['**/*.svelte'],
			customSyntax: 'postcss-html'
		}
	]
};
