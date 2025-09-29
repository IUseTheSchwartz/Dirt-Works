/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0F1115",
        steel: "#23262B",
        sand: "#D7C9B1",
        accent: "#FF7A1A",
      },
    },
  },
  plugins: [],
};
