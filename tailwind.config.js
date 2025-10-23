/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        notion: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      colors: {
        // Dark theme colors matching Notion
        "notion-bg": "#191919",
        "notion-gray": "#2f3437",
        "notion-gray-light": "#373737",
        "notion-gray-dark": "#1a1a1a",
        "notion-text": "#ffffff",
        "notion-text-light": "#9b9a97",
        "notion-text-muted": "#6f6e69",
        "notion-border": "#3d4144",
        "notion-border-light": "#4a4d50",
        "notion-hover": "#373737",
        "notion-hover-light": "#2f3437",
        "notion-blue": "#2383e2",
        "notion-green": "#0f7b0f",
        "notion-yellow": "#d9b600",
        "notion-red": "#e16259",
        "notion-purple": "#9065b0",
        "notion-orange": "#ff9500",
        // Status colors
        "status-not-started": "#6f6e69",
        "status-in-progress": "#2383e2",
        "status-done": "#0f7b0f",
        // Priority colors
        "priority-high": "#e16259",
        "priority-medium": "#ff9500",
        "priority-low": "#0f7b0f",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
