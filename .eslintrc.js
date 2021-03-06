module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: [
    'standard',
  ],
}
