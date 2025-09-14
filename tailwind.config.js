const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  plugins: [],
  theme       : {
    colors  : {
        transparent: 'transparent',
        current    : 'currentColor',
        black      : colors.black,
        white      : colors.white,
        pink       : colors.pink,
        gray       : colors.slate,
        red        : colors.red,
        orange     : colors.orange,
        amber      : colors.amber,
        yellow     : colors.yellow,
        green      : colors.green,
        teal       : colors.teal,
        blue       : colors.blue,
        indigo     : colors.indigo,
        purple     : colors.purple
    },
    fontSize: {
        'xs'  : '0.625rem',
        'sm'  : '0.75rem',
        'md'  : '0.8125rem',
        'base': '0.875rem',
        'lg'  : '1rem',
        'xl'  : '1.125rem',
        '2xl' : '1.25rem',
        '3xl' : '1.5rem',
        '4xl' : '2rem',
        '5xl' : '2.25rem',
        '6xl' : '2.5rem',
        '7xl' : '3rem',
        '8xl' : '4rem',
        '9xl' : '6rem',
        '10xl': '8rem'
    },
    screens : {
        'print': {'raw': 'print'},
        'xs': '320px',    // Small phones
        'sm': '480px',    // Large phones
        'md': '768px',    // Tablets
        'lg': '1024px',   // Laptops
        'xl': '1280px',   // Desktops
        '2xl': '1536px',  // Large Desktops
        '3xl': '1920px',  // Full HD
        '4xl': '2560px',  // 4K Screens
    },
    extend  : {
        backgroundColor: ['active'],
        animation : {
            'spin-slow': 'spin 3s linear infinite'
        },
        flex      : {
            '0': '0 0 auto'
        },
        opacity   : {
            12: '0.12',
            38: '0.38',
            87: '0.87'
        },
        rotate    : {
            '-270': '270deg',
            '15'  : '15deg',
            '30'  : '30deg',
            '60'  : '60deg',
            '270' : '270deg'
        },
        scale     : {
            '-1': '-1'
        },
        zIndex    : {
            '-1'   : -1,
            '49'   : 49,
            '60'   : 60,
            '70'   : 70,
            '80'   : 80,
            '90'   : 90,
            '99'   : 99,
            '999'  : 999,
            '9999' : 9999,
            '99999': 99999
        },
        spacing   : {
            '13': '3.25rem',
            '15': '3.75rem',
            '18': '4.5rem',
            '22': '5.5rem',
            '26': '6.5rem',
            '30': '7.5rem',
            '50': '12.5rem',
            '90': '22.5rem'
        },
        /**
         * Extended spacing values for width and height utilities.
         * This way, we won't be adding these to other utilities
         * that use 'spacing' config to keep the file size
         * smaller by not generating useless utilities such as
         * p-1/4 or m-480.
         */
        extendedSpacing: {
            // Fractional values
            '1/2': '50%',
            '1/3': '33.333333%',
            '2/3': '66.666667%',
            '1/4': '25%',
            '2/4': '50%',
            '3/4': '75%',

            // Bigger values
            '100': '25rem',
            '120': '30rem',
            '128': '32rem',
            '140': '35rem',
            '160': '40rem',
            '180': '45rem',
            '192': '48rem',
            '200': '50rem',
            '240': '60rem',
            '256': '64rem',
            '280': '70rem',
            '320': '80rem',
            '360': '90rem',
            '400': '100rem',
            '480': '120rem'
        },
    }
},
variants: {
  extend: {
    display: ['responsive'],
    transform: ['responsive'],
  },
},
}

