/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: { preflight: false }, // set not mainly css
  prefix: "tw-"
}

