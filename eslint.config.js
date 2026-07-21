import js from '@eslint/js';
import reactX from '@eslint-react/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['scripts/**/*.js', 'src/app/background/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        chrome: 'readonly',
        browser: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['scripts/**', 'src/app/background/**'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      reactX.configs['recommended'],
      eslintConfigPrettier,
    ],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      globals: { ...globals.browser, chrome: 'readonly', browser: 'readonly' },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: '*', next: 'export' },
        { blankLine: 'any', prev: 'export', next: 'export' },
      ],
      'no-unused-vars': 'warn',
      'react/prop-types': 'off',
      '@eslint-react/no-missing-key': 'warn',
      'no-console': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // 1. Побочные эффекты (например, import 'polyfill')
            ['^\\u0000'],
            // 2. Импорты типов (TypeScript)
            ['^import\\s+type\\s+'],
            // 3. Сторонние пакеты (react, lodash и т.д.)
            ['^@?\\w'],
            // 4. Абсолютные импорты / алиасы (например, @/)
            ['^@/'],
            // 5. Родительские директории (../)
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // 6. Текущая директория (./)
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // 7. Стили (.css, .scss, .module.scss) — всегда строго в конце
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
    },
  },
]);
