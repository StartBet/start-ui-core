import vue from 'eslint-plugin-vue';

export default [
  {
    files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx', '**/*.vue'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      vue
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      ...vue.configs['flat/recommended'].rules
    }
  }
];
