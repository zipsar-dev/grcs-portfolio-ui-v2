import type { Config } from "tailwind-config";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#39b54b",
          foreground: "#ffffff",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "#f0f0f0", // Example secondary color
          foreground: "#000000", // Example foreground for secondary color
        },
        destructive: {
          DEFAULT: "#ff0000", // Example destructive color (e.g., for error messages)
          foreground: "#ffffff", // Foreground for destructive color
        },
        muted: {
          DEFAULT: "#e5e7eb", // Example muted color
          foreground: "#6b7280", // Foreground for muted color
        },
      },
      spacing: {
        18: "4.5rem", // Adding custom spacing
        22: "5.5rem",
        26: "6.5rem",
      },
      borderRadius: {
        lg: "0.75rem", // Adjusting large border radius
        xl: "1rem", // Extra large border radius
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Custom font family
        serif: ["Georgia", "serif"],
      },
      fontSize: {
        xs: "0.75rem", // Extra small font size
        sm: "0.875rem", // Small font size
        base: "1rem", // Base font size
        lg: "1.125rem", // Large font size
        xl: "1.25rem", // Extra large font size
        "2xl": "1.5rem", // 2x large font size
        "3xl": "1.875rem", // 3x large font size
      },
      boxShadow: {
        custom: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Custom shadow
      },
    },
  },
  plugins: [], // Add any plugins here if needed
};

export default config;