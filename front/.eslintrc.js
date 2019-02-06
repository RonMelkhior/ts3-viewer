module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'vue/html-indent': ['tab'],
		'no-tabs': ['off'],
		'quotes': [1, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
		'semi': [1, 'always'],
		'comma-dangle': [1, 'always-multiline'],
		'space-before-function-paren': ['off'],
		'prefer-promise-reject-errors': ['error', { 'allowEmptyReject': true }],
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
};
