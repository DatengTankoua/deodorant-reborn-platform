import coreWebVitalsConfig from 'eslint-config-next/core-web-vitals'
import typescriptConfig from 'eslint-config-next/typescript'

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...coreWebVitalsConfig,
  ...typescriptConfig,
  {
    settings: {
      react: { version: '19.2' },
    },
  },
  {
    rules: {
      // Security: disallow eval
      'no-eval': 'error',
      // Enforce consistent imports
      'no-duplicate-imports': 'error',
      // Disallow console.log in production code (use a logger)
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // Disable new strict rule — async data-fetching and route-reset patterns
      // (localStorage init, useEffect data loads, pathname-based menu close) are
      // all idiomatic React and are incorrectly flagged as sync setState-in-effect.
      'react-hooks/set-state-in-effect': 'off',
      // TypeScript-specific
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
]

export default eslintConfig
