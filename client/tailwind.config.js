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
  },
  plugins: [require('flowbite/plugin', '@tailwindcss/forms')],
};
