module.exports = {
  content: ["./src/**/*.{js,html}"],
  theme: {
    extend: {
      spacing: {
        "header-size": "4.5rem",
      },
      fontFamily: {
        goldman: ["Goldman", "regular"],
      },
      colors: {
        content: "#E8ECF2",
        header: "#334155",
      },
      keyframes: {
        lightning: {
          "0%, 100%": { color: "#F1F5F9" },
          "50%": { color: "#67E8f9" },
        },
      },
      animation: {
        lightning: "lightning 0.25s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
