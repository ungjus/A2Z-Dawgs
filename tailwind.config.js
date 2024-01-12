/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './blog/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `blog` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: { // remove if you want all tags to be non defeult (h1 will be h1 instead of p size)
    preflight: true,
  }
}

