import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // --- CORE APP PALETTE ---
        // Best-practice neutrals remain the same.
        text: {
          primary: "#242424",   // Charcoal
          secondary: "#6B6B6B"  // Medium Grey
        },
        surface: {
          primary: "#FFFFFF",   // White
          border: "#EAEAEA"     // Light grey
        },
        
        // --- NEW BRAND ACCENT ---
        // Use as: bg-brand-primary, text-brand-primary
        brand: {
          // REPLACED with a deep, sophisticated "Gourmet Green".
          // This is our new accent for buttons and tabs.
          // It's "pale" in the sense of being less primary-colored.
          // It feels natural, fresh, and adventurous.
          primary: "#346B55" 
        },
        
        system: {
          success: "#2A8C4A", // A brighter green for success
          error: "#D93025"   // Warning Red
        },

        // --- NEW SOCIAL/WRAPPED PALETTE ---
        // New gradients that complement our "Gourmet Green" theme.
        wrapped: {
          // Warm, foodie, and joyful.
          gourmetPeach: {
            start: "#FF7F50", // Coral
            end: "#FFDAB9"    // Pale Peach
          },
          // The "night out" / urban vibe.
          urbanVibe: {
            start: "#372772", // Midnight Indigo
            end: "#E03FAC"    // Electric Magenta
          },
          // Connects directly back to our new brand color.
          freshFind: {
            start: "#346B55", // Gourmet Green
            end: "#A7F3D0"    // Light Mint
          }
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
        // UPDATED: 'hero' shadow now uses the new 'Gourmet Green' color
        hero: "0 18px 50px rgba(52, 107, 85, 0.28)" 
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