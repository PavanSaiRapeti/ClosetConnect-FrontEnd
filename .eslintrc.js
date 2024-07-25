module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    '@next/next/no-img-element': 'off',
  },
};
