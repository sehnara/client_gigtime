/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        10: "10 10 0%",
      },
      width: {
        128: "32rem",
      },
      fontFamily: {
        jua: ['"Jua"', "sans-serif"],
        picture: ['"Black And White Picture"', "sans-serif"]
      },
      translate: {
        "-1/2": "-50%",
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
      },
      plugins: [],
    },
  },
};
