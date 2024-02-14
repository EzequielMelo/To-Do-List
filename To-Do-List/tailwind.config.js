/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.css",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: "rgba(10, 9, 24, 0.7)",
        grey: "rgb(158,172,186)",
        bhind: "rgb(0, 0, 0)"
      }
    },
    backgroundImage : {
      back : "url(./assets/background.png)"
    }
  },
  plugins: [],
}

