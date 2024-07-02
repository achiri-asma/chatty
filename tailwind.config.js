/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#0D9276',
        bg:'#6dbda8',
        bluee:'#009FBD',
        
      },
    },
  },
  plugins: [
  ],
}

