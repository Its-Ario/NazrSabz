/** @type {import('vite').UserConfig} */
import tailwindcss from '@tailwindcss/vite';

export default {
    server: {
        proxy: {
            '/api': 'http://localhost:3000',
        },
        plugins: [tailwindcss()],
    },
};
