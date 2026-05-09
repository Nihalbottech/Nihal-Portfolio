/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF", // pure white
        surface: "#FFFFFF",    // pure white
        primary: "#9694B8",    // muted lavender/purple
        accent: "#000000",     // pure black
        success: "#000000",    // pure black
        text: "#000000",       // pure black
        muted: "#666666",      // neutral gray (for readable secondary text)
        borderLine: "#E5E5E5"  // light neutral gray (for borders)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      }
    },
  },
  plugins: [],
}
