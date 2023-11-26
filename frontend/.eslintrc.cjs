module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    '@rocketseat/eslint-config/react',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'eslint-disable-next-line camelcase': 'off'
  },
}
