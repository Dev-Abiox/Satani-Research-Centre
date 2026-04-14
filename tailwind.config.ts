import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1536px',
        '3xl': '1920px',
      },
      fontSize: {
        'display': ['64px', { lineHeight: '1.1', fontWeight: '300' }],
        'heading-1': ['52px', { lineHeight: '1.15', fontWeight: '400' }],
        'heading-2': ['40px', { lineHeight: '1.2', fontWeight: '400' }],
        'heading-3': ['32px', { lineHeight: '1.25', fontWeight: '500' }],
        'heading-4': ['24px', { lineHeight: '1.3', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
      },
      colors: {
        /* Exact criver.com color system */
        primary: {
          25: "#F5F9FF",
          50: "#EFF7FF",
          100: "#C1E2FF",
          200: "#86BEEE",
          300: "#65A5DC",
          400: "#438CCB",
          500: "#005AA8",
          600: "#004886",
          700: "#003665",
          800: "#002443",
          900: "#001222",
        },
        neutral: {
          25: "#F7F7F7",
          50: "#F2F2F2",
          100: "#E6E6E6",
          150: "#D9D9D9",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#949494",
          500: "#808080",
          600: "#676767",
          700: "#4D4D4D",
          800: "#333333",
          850: "#272727",
          900: "#1A1A1A",
          950: "#0D0D0D",
        },
        accent: {
          DEFAULT: "#005AA8",
          light: "#2273B9",
          dark: "#004886",
          panel: "#003D99",
          career: "#001739",
        },
      },
      maxWidth: {
        "8xl": "1440px",
        "9xl": "1920px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
