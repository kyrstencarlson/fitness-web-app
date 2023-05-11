module.exports = {
    env: {
        es6: true,
        node: true,
        jest: true,
        browser: true
    },
    globals: {
        React: true,
        JSX: true
    },
    extends: 'eslint:recommended',
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    rules: {
    //     'prettier/prettier': 0,
        'no-unused-vars': ['off'],
    //     quotes: ['error', 'single'],
    //     'no-console': 'warn',
    //     '@typescript-eslint/no-unused-vars': ['off'],
    //     '@typescript-eslint/explicit-function-return-type': 'off',
    //     'no-empty': 'warn',
    //     'no-undef': 'off',
    //     'array-bracket-spacing': ['error', 'never'],
    //     'array-element-newline': ['error', 'consistent'],
    //     'array-bracket-newline': ['error', 'consistent'],
    //     'block-spacing': ['error', 'always'],
    //     'brace-style': [
    //         'error',
    //         'stroustrup',
    //         {
    //             allowSingleLine: true
    //         }
    //     ],
    //     'func-call-spacing': ['error', 'never'],
    //     'comma-dangle': ['warn', 'never'],
    //     'comma-spacing': [
    //         'error',
    //         {
    //             before: false,
    //             after: true
    //         }
    //     ],
    //     'comma-style': ['error', 'last'],
    //     'eol-last': ['error', 'always'],
    //     'implicit-arrow-linebreak': ['error', 'beside'],
    //     'indent': ['error', 4],
    //     'jsx-quotes': ['warn', 'prefer-single'],
    //     'key-spacing': [
    //         'error',
    //         {
    //             beforeColon: false
    //         }
    //     ],
    //     'keyword-spacing': [
    //         'error',
    //         {
    //             overrides: {
    //                 if: {
    //                     before: true,
    //                     after: true
    //                 },
    //                 for: {
    //                     before: true,
    //                     after: true
    //                 },
    //                 while: {
    //                     before: true,
    //                     after: true
    //                 }
    //             }
    //         }
    //     ],
    //     'line-comment-position': [
    //         'warn',
    //         {
    //             position: 'above'
    //         }
    //     ],
    //     'lines-around-comment': [
    //         'error',
    //         {
    //             beforeBlockComment: true
    //         }
    //     ],
    //     'lines-between-class-members': ['error', 'always'],
    //     'multiline-ternary': ['warn', 'always-multiline'],
    //     'new-parens': 'error',
    //     'newline-per-chained-call': [
    //         'error',
    //         {
    //             ignoreChainWithDepth: 3
    //         }
    //     ],
    //     'no-trailing-spaces': 'warn',
    //     'no-multi-spaces': 'error',
    //     'no-mixed-spaces-and-tabs': 'error',
    //     'no-multi-assign': 'warn',
    //     'no-multiple-empty-lines': [
    //         'error',
    //         {
    //             max: 2,
    //             maxEOF: 1
    //         }
    //     ],
    //     'no-negated-condition': 'error',
    //     'no-unneeded-ternary': 'error',
    //     'no-whitespace-before-property': 'error',
    //     'object-curly-newline': [
    //         'error',
    //         {
    //             ObjectExpression: {
    //                 minProperties: 4,
    //                 multiline: true,
    //                 consistent: true
    //             },
    //             ObjectPattern: {
    //                 minProperties: 4,
    //                 multiline: true,
    //                 consistent: true
    //             }
    //         }
    //     ],
    //     'object-curly-spacing': ['error', 'always'],
    //     'object-property-newline': 'warn',
    //     'one-var': ['error', 'never'],
    //     'operator-linebreak': ['error'],
    //     'padding-line-between-statements': [
    //         'error',
    //         {
    //             blankLine: 'always',
    //             prev: '*',
    //             next: 'return'
    //         }
    //     ],
    //     semi: ['warn', 'always'],
    //     'semi-style': ['warn', 'last'],
    //     'space-in-parens': ['warn', 'never'],
    //     'space-infix-ops': 'error',
    //     'space-unary-ops': 'error',
    //     'arrow-body-style': ['warn', 'as-needed'],
    //     'arrow-parens': ['error', 'as-needed'],
    //     'arrow-spacing': [
    //         'error',
    //         {
    //             before: true,
    //             after: true
    //         }
    //     ],
    //     'no-confusing-arrow': 'error',
    //     'no-useless-rename': 'error',
    //     'no-useless-computed-key': 'error',
    //     'no-useless-constructor': 'error',
    //     'no-var': 'error',
    //     'prefer-arrow-callback': 'error',
    //     'prefer-const': 'error',
    //     'prefer-rest-params': 'error',
    //     'prefer-spread': 'error',
    //     'prefer-template': 'error',
    //     'yield-star-spacing': ['error', 'after']
    }
};
