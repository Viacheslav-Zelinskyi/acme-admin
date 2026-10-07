import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  { ignores: ['dist', 'storybook-static'] },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Architecture rule: the library must stay presentational
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['react-router*'], message: 'Routing belongs to apps/web. Use props/callbacks.' },
            { group: ['axios', 'swr', '@tanstack/*'], message: 'Data fetching belongs to apps/web.' },
          ],
        },
      ],
      'no-restricted-globals': [
        'error',
        { name: 'fetch', message: 'No API access in shared components.' },
        { name: 'localStorage', message: 'No storage access in shared components.' },
      ],
    },
  },
);
