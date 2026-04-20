/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        neonOrange: "#ff6b00",
        darkCard: "#1f1f1f",
        lightCard: "#f3f3f3",
      },
      fontFamily: {
        heading: ["var(--font-pixelify)", "cursive", "sans-serif"],
        quicksand: ["var(--font-quicksand)", "sans-serif"],
      },
      fontSize: {
        'phi-body': '1rem',      // 16px
        'phi-h4': '1.618rem',    // ~25.8px
        'phi-h3': '2.618rem',    // ~41.8px
        'phi-h2': '4.236rem',    // ~67.7px
        'phi-h1': '6.854rem',    // ~109.6px
      },
      animation: {
        'glitch': 'glitch 1s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'slideUpFade': 'slideUpFade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'gradientY': 'gradientY 3s ease infinite',
      },
      keyframes: {
        gradientY: {
          '0%, 100%': { backgroundPosition: 'top' },
          '50%': { backgroundPosition: 'bottom' },
        },
        glitch: {
          '2%, 64%': { transform: 'translate(2px, 0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px, 0) skew(0deg)' },
          '62%': { transform: 'translate(0, 0) skew(5deg)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        slideUpFade: {
          '0%': { transform: 'translateY(80px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};
