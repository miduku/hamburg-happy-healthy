module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended'
    // 'plugin:vue/strongly-recommended',
  ],
  plugins: [
    'prettier'
    // 'vue'
  ],
  // add your custom rules here
  rules: {
    "no-console": "off",
    "new-cap": "off"
  }
}
