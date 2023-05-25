module.exports = {
  extends: ['eslint:recommended', 'google', 'react-app', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    useJSXTextNode: true,
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
    mocha: true,
    es6: true,
  },
  rules: {
    indent: ['error', 2],
    curly: ['error', 'all'],
    'arrow-parens': ['error', 'as-needed'],
    'quote-props': ['error', 'as-needed'],
    'no-console': [
      'error',
      {
        allow: ['log', 'warn', 'error'],
      },
    ],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
    'max-len': [
      'error',
      {
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'block-spacing': ['error', 'always'],
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: false,
        },
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
      },
    ],
    'padded-blocks': ['error', 'never', { allowSingleLineBlocks: true }],
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'no-restricted-imports': [
      'error',
      {
        paths: ['lodash', '@material-ui/icons'],
        patterns: [
          '@material-ui/core/**/*',
          '@material-ui/icons/*/*',
          '!@material-ui/icons/utils/createSvgIcon',
          '!@material-ui/core/OverridableComponent',
        ],
      },
    ],

    'react/jsx-tag-spacing': ['warn', { beforeClosing: 'never' }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        indent: 'off',
        'valid-jsdoc': 'off',

        'react/prop-types': 'off',

        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        // BUG: https://github.com/typescript-eslint/typescript-eslint/issues/455
        // BUG: https://github.com/typescript-eslint/typescript-eslint/issues/1824
        // '@typescript-eslint/indent': ['error', 2],
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            functions: false,
          },
        ],
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array-simple',
          },
        ],
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: 'props|theme|event',
          },
        ],
        '@typescript-eslint/no-empty-interface': [
          'error',
          {
            allowSingleExtends: true,
          },
        ],

        'no-invalid-this': 'off',
        'no-self-assign': 'off',
        'max-len': 'off',
        'no-restricted-imports': ['off'],
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        'no-restricted-imports': ['off'],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
