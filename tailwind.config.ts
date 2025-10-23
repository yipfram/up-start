import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#fc5218",
          secondary: "#ff8a3d",
          dark: "#1f2933",
          muted: "#52606d",
          surface: "#f5f7fa"
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "sans-serif"
        ]
      },
      boxShadow: {
        card: "0 12px 30px rgba(15, 23, 42, 0.12)",
        hero: "0 18px 50px rgba(252, 82, 24, 0.28)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-120px 0" },
          "100%": { backgroundPosition: "120px 0" }
        }
      },
      animation: {
        shimmer: "shimmer 1.8s linear infinite"
      }
    }
  },
  plugins: []
} satisfies Config;
