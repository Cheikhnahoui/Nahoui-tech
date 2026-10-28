import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050A16",
        navy: "#0A1226",
        panel: "#0E1830",
        accent: "#3B82F6",
        glow: "#8DB8FF",
        mist: "#A9B6CF",
      },
      fontFamily: {
        sans: ['"Segoe UI"', "Inter", "system-ui", "-apple-system", "Roboto", '"Helvetica Neue"', "Arial", "sans-serif"],
        arabic: ['"Segoe UI"', "Tahoma", '"Noto Naskh Arabic"', "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
