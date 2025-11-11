import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores([
        "node_modules",
        "dist",
        ".vitepress",
        "**/generated/*",
    ]),
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.jest,
            },
        },
        rules: {
            'no-restricted-syntax': [
                'error',
                {
                    selector: "CallExpression[callee.name='require']",
                    message: 'Please use ES module import instead of require()',
                },
                {
                    selector: "MemberExpression[object.name='module'][property.name='exports']",
                    message: 'Please use ES module export instead of module.exports',
                },
            ],
            'no-undef': 'error',
        },
    },
]);
