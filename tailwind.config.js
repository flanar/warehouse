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
        extend: {},
    },
    variants: {
        extend: {
            backgroundColor: ['odd', 'checked'],
        },
        scrollbar: ['rounded'],
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
}
