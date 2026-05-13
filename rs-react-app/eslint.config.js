import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactPlugin from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

const forbiddenReactHookImports = [
  'useActionState',
  'useCallback',
  'useContext',
  'useDebugValue',
  'useDeferredValue',
  'useEffect',
  'useFormStatus',
  'useId',
  'useImperativeHandle',
  'useInsertionEffect',
  'useLayoutEffect',
  'useMemo',
  'useOptimistic',
  'useReducer',
  'useRef',
  'useState',
  'useSyncExternalStore',
  'useTransition',
];

const reactNamespaceHookSelectors = forbiddenReactHookImports.map((name) => ({
  selector: `MemberExpression[object.name="React"][property.name="${name}"]`,
  message:
    'Hooks are forbidden in this task; use class components and lifecycle methods.',
}));

export default defineConfig([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
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
              name: 'react',
              importNames: forbiddenReactHookImports,
              message:
                'Hooks are forbidden in this task; use class components and lifecycle methods.',
            },
            { name: 'redux', message: 'External state managers are not allowed by task requirements.' },
            {
              name: 'react-redux',
              message: 'External state managers are not allowed by task requirements.',
            },
            {
              name: '@reduxjs/toolkit',
              message: 'External state managers are not allowed by task requirements.',
            },
            { name: 'zustand', message: 'External state managers are not allowed by task requirements.' },
            { name: 'jotai', message: 'External state managers are not allowed by task requirements.' },
            { name: 'recoil', message: 'External state managers are not allowed by task requirements.' },
            { name: 'mobx', message: 'External state managers are not allowed by task requirements.' },
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
      'no-restricted-syntax': ['error', ...reactNamespaceHookSelectors],
    },
  },
]);
