module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js'],
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
};
