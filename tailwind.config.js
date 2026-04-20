/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "radial-glow": "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(108,63,197,0.15) 0%, transparent 70%)",
      },
      colors: {
        primary: {
          DEFAULT: "#6C3FC5",
          light: "#8B5CF6",
          dark: "#4C2E8A",
        },
        accent: {
          DEFAULT: "#2DD4AA",
          light: "#5EEAD4",
          dark: "#1A9E80",
        },
        surface: {
          DEFAULT: "#F8F7FF",
          card: "#FFFFFF",
        },
        text: {
          primary: "#1A1A2E",
          secondary: "#4A4A6A",
          muted: "#9090AA",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}