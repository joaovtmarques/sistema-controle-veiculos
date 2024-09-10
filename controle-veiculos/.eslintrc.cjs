module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'import', 'prettier'],
	rules: {
		'prettier/prettier': ['error'],
		'react/react-in-jsx-scope': 'off',
		'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
		'import/no-unresolved': 'off',
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.tsx', '.ts'],
				moduleDirectory: ['node_modules', 'src/'],
			},
			typescript: {},
		},
	},
};
