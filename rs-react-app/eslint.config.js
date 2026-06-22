import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'coverage', '.next']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'],
      eslintConfigPrettier,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'jotai',
              message: 'External state managers are not allowed by task requirements.',
            },
            {
              name: 'recoil',
              message: 'External state managers are not allowed by task requirements.',
            },
            {
              name: 'mobx',
              message: 'External state managers are not allowed by task requirements.',
            },
            {
              name: 'mobx-react',
              message: 'External state managers are not allowed by task requirements.',
            },
            {
              name: 'mobx-react-lite',
              message: 'External state managers are not allowed by task requirements.',
            },
            {
              name: '@mui/material',
              message: 'Component libraries (e.g. MUI) are not allowed by task requirements.',
            },
            {
              name: '@mui/icons-material',
              message: 'Component libraries (e.g. MUI) are not allowed by task requirements.',
            },
            {
              name: 'antd',
              message: 'Component libraries (e.g. Ant Design) are not allowed by task requirements.',
            },
            {
              name: '@ant-design/icons',
              message: 'Component libraries (e.g. Ant Design) are not allowed by task requirements.',
            },
            {
              name: '@chakra-ui/react',
              message: 'Component libraries are not allowed by task requirements.',
            },
            {
              name: '@mantine/core',
              message: 'Component libraries are not allowed by task requirements.',
            },
            {
              name: '@mantine/hooks',
              message: 'Component libraries are not allowed by task requirements.',
            },
          ],
          patterns: [
            {
              group: ['@mui/*'],
              message: 'Component libraries (e.g. MUI) are not allowed by task requirements.',
            },
            {
              group: ['@chakra-ui/*'],
              message: 'Component libraries are not allowed by task requirements.',
            },
            {
              group: ['@mantine/*'],
              message: 'Component libraries are not allowed by task requirements.',
            },
            {
              group: ['@ant-design/*'],
              message: 'Component libraries are not allowed by task requirements.',
            },
          ],
        },
      ],
    },
  },
]);
