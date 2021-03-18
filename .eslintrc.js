module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/no-inferrable-types': 'off'
  },
  settings: {
    'import/resolver': {
      nuxt: {
        extensions: ['.js', '.vue']
      }
    }
  }
}
