/* eslint-disable @typescript-eslint/camelcase */

module.exports = {
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === "production",
    content: ["src/**/*.vue"]
  },
  theme: {
    extend: {
      colors: {
        accent: {
          50: "#F4FDFD",
          100: "#E8FAFB",
          200: "#C6F3F6",
          300: "#A3EBF0",
          400: "#5EDDE5",
          500: "#19CEDA",
          600: "#17B9C4",
          700: "#0F7C83",
          800: "#0B5D62",
          900: "#083E41"
        },

        "dark-river": {
          50: "#F3F4F6",
          100: "#E7E9EE",
          200: "#C4C7D4",
          300: "#A0A5B9",
          400: "#586285",
          500: "#111F51",
          600: "#0F1C49",
          700: "#0A1331",
          800: "#080E24",
          900: "#050918"
        },

        primary: {
          100: "#EBEFFA",
          200: "#CED7F2",
          300: "#B0BFEA",
          400: "#748EDA",
          500: "#395ECA",
          600: "#3355B6",
          700: "#223879",
          800: "#1A2A5B",
          900: "#111C3D"
        },

        secondary: {
          100: "#F3F3FB",
          200: "#E0E2F5",
          300: "#CED1EF",
          400: "#A9AEE4",
          500: "#848BD8",
          600: "#777DC2",
          700: "#4F5382",
          800: "#3B3F61",
          900: "#282A41"
        }
      },

      screens: {
        xs: "384px",
        xs_max: { max: "384px" },
        sm_max: { max: "576px" },
        md_max: { max: "768px" },
        lg_max: { max: "1024px" },
        xl_max: { max: "1280px" }
      }
    }
  },
  variants: {},
  plugins: [],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  }
};
