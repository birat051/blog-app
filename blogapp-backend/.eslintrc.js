module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true
  },
  plugins: ['jest'],
  extends: [
    'standard',
    'plugin:jest/recommended',
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
  },
  settings: {
    jest: {
      version: '29.7.0' // replace with your Jest version
    }
  }
}
