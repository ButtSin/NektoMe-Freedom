import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      'no-console': 'warn',
      eqeqeq: 'warn',
      quotes: ['warn', 'single'],
      'no-else-return': 'warn',
    },
  },
  pluginVue.configs['flat/essential'],
]);
