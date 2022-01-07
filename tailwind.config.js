const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pools/**/*.{tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  // prefix: 'q-',
  important: true,
  mode: "jit",
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["Poppins", "serif"],
    },
    extend: {
      fontSize: {
        xs: ".6875rem",
        sm: ".875rem",
        tiny: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
      screens: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        "2xl": "1536px",
      },
      colors: {
        main: "#FF27D6",
        mainDark: "#523675",
        mainTheme: "#6825e7",
        acc: "#f9b707",
        "main-lighter": "#ba84ff",
        dark: "#16142e",
        dark2: "#000000",
        "dark2-hover": "#181941",
        dark3: "#1a192a",
        darkGray: "#1E1D2A",
        gray: colors.trueGray,
        pink: "#FF27D6",
        // lighter: colors.gray['400'],
        primary: "#fb71ae",
        purple: "#9d28eb",
        // primary: {
        //   blue: "#1FBAF7",
        //   green: "#26E0CF",
        // },
        second: {
          purple: "#8C1CED",
          pink: "#ED00BD",
        },
        ignored: colors.trueGray["400"],
        muted: colors.trueGray["400"],
        solana: "#36c8b9",
        polkadot: "#E6007A",
        hover: "#e60669",
        ada: "#0033ad",
        secondary: colors.trueGray["400"],
      },
      fontFamily: {
        Ubuntu: ["Ubuntu", "sans-serif"],
        Rubik: ["Rubik", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
        poppinsItalic: ["Poppins-italic", "sans-serif"],
        PFD: ["PFDinDisplayPro", "sans-serif"],
        primary: ["Gill Sans", "sans-serif"],
        secondary: ["Alfphabet", "sans-serif"],
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
