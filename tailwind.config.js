const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        colors: {
            coolGray: colors.coolGray,
            cyan: colors.cyan,
            green: colors.green,
            rose: colors.rose,
            teal: colors.teal,
            white: colors.white
        },
        extend: {
            minWidth: {
                'xs': '20rem',
                'sm': '24rem',
                'md': '28rem',
                'lg': '32rem',
                'xl': '36rem',
                '2xl': '42rem',
                '3xl': '48rem',
                '4xl': '56rem',
            },
            maxWidth: {
                '280': '280px',
            },
            minHeight: {
                '150': '150px',
                '300': '300px'
            }
        },
    },
    variants: {
        extend: {
            backgroundColor: ['odd', 'checked', 'disabled'],
        },
        scrollbar: ['rounded'],
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
}
