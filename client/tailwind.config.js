/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  extend: {
     colors: {
    blue: { 900: "#1E3A8A" },
    teal: { 500: "#2DD4BF", 600: "#0D9488" },
    gray: { 50: "#E5E7EB", 600: "#6B7280" },
    red: { 600: "#DC2626" },
  },
  fontFamily: {
    sans: ["Inter", "sans-serif"],
  },
  },
},


  plugins: [],
};
