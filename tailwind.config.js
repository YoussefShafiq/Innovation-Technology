/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          light:   "var(--color-primary-light)",
          dark:    "var(--color-primary-dark)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          light:   "var(--color-secondary-light)",
          dark:    "var(--color-secondary-dark)",
        },
        background: "var(--color-background)",
        surface:    "var(--color-surface)",
        "text-primary":   "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft:  "0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)",
        card:  "0 4px 24px -4px rgba(0,0,0,0.10)",
        glow:  "0 0 30px -5px var(--color-primary)",
        "glow-secondary": "0 0 30px -5px var(--color-secondary)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          sm:  "1.5rem",
          lg:  "2rem",
          xl:  "2.5rem",
          "2xl": "3rem",
        },
      },
    },
  },
  plugins: [],
}
