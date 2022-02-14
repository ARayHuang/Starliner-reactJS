module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'xo',
		'plugin:react/recommended',
	],
	settings: {
		react: {
			pragma: 'React',
			version: 'detect',
		},
	},
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		browser: true,
		node: true,
		jest: true,
	},
	plugins: [
		'react',
		'react-hooks',
	],
	rules: {
		'padding-line-between-statements': [
			'error',
			{
				blankLine: 'always',
				prev: 'multiline-block-like',
				next: '*',
			},
			{
				blankLine: 'always',
				prev: '*',
				next: [
					'block',
					'block-like',
					'cjs-export',
					'class',
					'const',
					'export',
					'import',
					'let',
					'var',
				],
			},
			{
				blankLine: 'always',
				prev: [
					'block',
					'block-like',
					'cjs-export',
					'class',
					'const',
					'export',
					'import',
					'let',
					'var',
				],
				next: '*',
			},
			{
				blankLine: 'never',
				prev: ['const', 'let', 'var'],
				next: ['const', 'let', 'var'],
			},
			{
				blankLine: 'any',
				prev: ['export', 'import'],
				next: ['export', 'import'],
			},
		],
		'comma-dangle': ['error', 'always-multiline'],
		'object-curly-spacing': ['error', 'always'],
		'valid-jsdoc': ['error', { requireParamDescription: false, requireReturnDescription: false }],
		'default-param-last': 'off',
		'no-warning-comments': [0, { terms: ['fixme', 'xxx'], location: 'start' }],
		'new-cap': [2, { capIsNewExceptions: ['Map', 'List'] }],
		complexity: ['warn', { max: 100 }],
		'react/display-name': 'off',
	},
	overrides: [
		{
			files: ['**/*.tsx'],
			extends: ['plugin:@typescript-eslint/recommended'],
			rules: {
				'@typescript-eslint/no-var-requires': 'error',
				'@typescript-eslint/no-empty-function': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				// '@typescript-eslint/no-use-before-define': [
				// 	'error',
				// 	{
				// 		functions: false,
				// 	}
				// ],
				'@typescript-eslint/no-unused-vars': [
					'warn',
					{
						varsIgnorePattern: 'dontcare.*',
					},
				],
			},
		},
	],
};
