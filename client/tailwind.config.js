/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js',
    './node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image': 'url("./assets/spices.png")',
      },
    },
    // screens: {
    //   'custom-sm': '500px',
    //   'custom-md': '750px',
    //   'custom-lg': '1000px',
    //   'custom-xl': '1300px',
    // },
    container: {
      center: true,
    },
  },
  plugins: [require('flowbite/plugin', '@tailwindcss/forms')],
};
