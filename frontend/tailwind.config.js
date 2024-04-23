/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#34695F',
      }, boxShadow: {
        form: "rgba(0, 0, 0, 0.10) 0px 0px 4px, rgba(0, 0, 0, 0.10) 0px 2px 4px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], 
    base: true,  
    utils: true, 
    themeRoot: ":root",
  },
}

