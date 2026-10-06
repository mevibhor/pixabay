/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      keyframes: {
        "fade-up": {
          from: {
            opacity: "0",
            transform: "translateY(12px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        "modal-backdrop": {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },

        "modal-content": {
          from: {
            opacity: "0",
            transform: "scale(0.96)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },

      animation: {
        "fade-up": "fade-up 0.7s ease-out both",

        "modal-backdrop": "modal-backdrop 0.45s ease-out both",

        "modal-content":
          "modal-content 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },

  plugins: [],
};
