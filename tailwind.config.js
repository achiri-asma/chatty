/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#009788',
        bg:'#6dbda8',
        bluee:'#009FBD',
        custgreen: '#e2fecb',
        yellcolor:'#ffefb3',
        redd:'#da3545',
        gri:'#efefef',
        gr:'#999999'
        
      },
    },
  },
  plugins: [
  ],
}

