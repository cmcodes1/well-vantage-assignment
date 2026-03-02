module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-console': ['warn', {allow: ['warn', 'error']}],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
    ],
    'react-native/no-inline-styles': 'warn',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
