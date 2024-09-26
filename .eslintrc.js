module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'react-hooks',
        'personal-use-fsd-plugin',
        'unused-imports',
        'eslint-plugin-import',
    ],
    rules: {
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'import/no-unresolved': 'off',
        'react/jsx-max-props-per-line': ['error', { maximum: 4 }],
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        // 'padded-blocks': ['error', {
        //     blocks: 'always',
        //     classes: 'always',
        //     switches: 'never',
        // }],
        // 'nonblock-statement-body-position': ['error', 'below'],
        curly: ['error', 'all'],
        'jsx-a11y/click-events-have-key-events': 'warn',
        'jsx-a11y/no-static-element-interactions': 'warn',
        // для плагина хуков
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
        // 'arrow-body-style': ['error', 'always'],
        'no-param-reassign': 'off',
        'react/prop-types': 'warn',
        'max-len': ['error', { code: 120 }],
        'no-undef': 'off',
        'react/no-array-index-key': 'off',
        'personal-use-fsd-plugin/path-checker': ['error', { alias: '@' }],
        'personal-use-fsd-plugin/layer-imports': [
            'error',
            {
                alias: '@',
                ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
            },
        ],
        'unused-imports/no-unused-imports': 'error',
        'personal-use-fsd-plugin/public-api-imports': [
            'error',
            {
                alias: '@',
                testFilesPatterns: [
                    '**/*.test.*',
                    '**/*.stories.*',
                    '**/*.story.*',
                    '**/StoreDecorator.tsx',
                ],
            },
        ],

        'react/destructuring-assignment': 'warn',

        // для импортов
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal'],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '@/**',
                        group: 'external',
                        position: 'after',
                    },
                ],
                pathGroupsExcludedImportTypes: ['react'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'max-len': 'off',
                'react/jsx-props-no-spreading': 'off',
            },
        },
        {
            files: ['*.d.{ts,tsx}'],
            rules: {
                'no-undef': 'warn',
            },
        },
    ],
};
