/** @type {import('tailwindcss').Config} */

export default {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#2E7D32', // User requested green
                secondary: '#424242', // User requested dark gray
                accent: '#42A5F5', // User requested blue
                'background-light': '#F5F5F5', // User requested light cream/white
                'background-dark': '#121212',
            },
            fontFamily: {
                display: ['Work Sans', 'Noto Sans', 'sans-serif'],
            },
            borderRadius: { DEFAULT: '0.75rem', lg: '1rem', xl: '1.5rem', full: '9999px' },
        },
    },
};
