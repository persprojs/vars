module.exports = {
  root: true,
  parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
          jsx: true
      }
  },
  env: { browser: true, node: true, es6: true },
  extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended'
  ],
  plugins: ['react', 'react-hooks'],
  rules: {
      'no-unused-vars': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off'
  },
  settings: {
      react: {
          version: 'detect'
      }
  }
}
