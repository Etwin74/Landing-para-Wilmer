/** @type {import('tailwindcss').Config} */
module.exports = {
  // 👇 Dile a Tailwind dónde escanear clases para "purge"
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {}
  },
  plugins: []
};
