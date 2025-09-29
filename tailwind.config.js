/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#0F1115",
        steel: "#23262B",
        sand: "#D7C9B1",
        accent: "#FF7A1A",
      },
      borderRadius: { xl2: "1.25rem" }
    },
  },
  plugins: [],
};
