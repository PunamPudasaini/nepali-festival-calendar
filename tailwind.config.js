/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          100: "#0066CC",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          200: "#FF9933",
          100: "#8B0000",
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // theme: {
  //   fontFamily: {
  //     'outfit': ['Outfit', 'sans-serif'],
  //     'antonio': ['Antonio', 'sans-serif'],
  //   },
  //   container: {
  //     center: true,
  //     padding: {
  //       DEFAULT: 0,
  //       // lg: '4rem',
  //       xl: '5rem',
  //       '2xl': '6rem',
  //     },
  //     screens: {
  //       "2xl": "1440px",
  //       "xl": "1280px",
  //       "lg": "1024px",
  //       "md": "768px",
  //       "sm": "640px"
  //     },
  //   },
  //   screens: {
  //     "2xs": "362px",
  //     // => @media (min-width: 360px) { ... }

  //     xs: "380px",
  //     // => @media (min-width: 380px) { ... }

  //     sm: "640px",
  //     // => @media (min-width: 640px) { ... }

  //     md: "768px",
  //     // => @media (min-width: 768px) { ... }

  //     lg: "1024px",
  //     // => @media (min-width: 1024px) { ... }

  //     xl: "1280px",
  //     // => @media (min-width: 1280px) { ... }
  //     // "2xl": "1440px",
  //     // => @media (min-width: 1440px) { ... }
  //   },
  //   extend: {
  //     colors: {
  //       border: "hsl(var(--border))",
  //       input: "hsl(var(--input))",
  //       ring: "hsl(var(--ring))",
  //       background: "hsl(var(--background))",
  //       foreground: "hsl(var(--foreground))",
  //       primary: {
  //         50: "#e8f5ed",
  //         100: "#c8e6d5",
  //         200: "#9cd3b3",
  //         300: "#6dbe90",
  //         400: "#42ab6f",
  //         500: "#18984f",
  //         600: "#148143",
  //         700: "#116c38",
  //         800: "#0e572d",
  //         900: "#0b4424",
  //         DEFAULT: "#20433D",
  //         foreground: "hsl(var(--primary- foreground))",
  //       },
  //       secondary: {
  //         50: "#e8edef",
  //         100: "#c7d3d9",
  //         200: "#9ab0ba",
  //         300: "#6b8c9a",
  //         400: "#3e697c",
  //         500: "#14485f",
  //         600: "#113d51",
  //         700: "#0e3343",
  //         800: "#0b2936",
  //         900: "#09202b",
  //         DEFAULT: "#09202b",
  //         foreground: "hsl(var(--secondary-foreground))",
  //       },
  //       grey: {
  //         50: "#ffffff",
  //         100: "#fdfdfd",
  //         200: "#f6f6f6",
  //         300: "#f2f2f2",
  //         400: "#dedede",
  //         500: "#c8c8c8",
  //         600: "#9b9b9b",
  //         700: "#6f6f6f",
  //         800: "#5d5d5d",
  //         900: "#424242",
  //         11: "#3c3c3c",
  //         12: "#333333",
  //         13: "#212121",
  //         DEFAULT: "#212121",
  //         foreground: "hsl(var(--secondary-foreground))",
  //       },
  //       red: {
  //         50: "#fee9ea",
  //         100: "#fdcacd",
  //         200: "#fba0a5",
  //         300: "#f9747b",
  //         400: "#f74a53",
  //         500: "#f5222d",
  //         600: "#d01d26",
  //         700: "#ae1820",
  //         800: "#8c131a",
  //         900: "#6e0f14",
  //         DEFAULT: "#6e0f14",
  //         foreground: "hsl(var(--secondary-foreground))",
  //       },
  //       yellow: {
  //         50: "#FDFBE6", //yellow light
  //         100: "#fbf4c2",
  //         200: "#f8ec92",
  //         300: "#f4e360",
  //         400: "#f1da30",
  //         500: "#eed202",
  //         600: "#cab302",
  //         700: "#a99501",
  //         800: "#887801",
  //         900: "#6b5e01",
  //         11: "#F0EDCE",
  //         12: "#B5CE02",
  //         DEFAULT: "#DBA828",
  //         foreground: "hsl(var(--secondary-foreground))",
  //       },

  //       green: {
  //         50: "#B4CF00", //light
  //         100: "#0E8D56",
  //         200: "#E9ECEC",
  //         DEFAULT: "#B4CF00",
  //         foreground: "hsl(var(--secondary-foreground))",
  //       },

  //       black: {
  //         400: "#595959",
  //         300: '#B3B3B3', // Grey
  //         200: '#949494',
  //         100: '#DDD',
  //         DEFAULT: '#212121',
  //       },
  //       destructive: {
  //         DEFAULT: "#FF4637", //ERROR
  //         foreground: "hsl(var(--destructive-foreground))",
  //       },

  //       success: {
  //         DEFAULT: "#009E60", // SUCCESS
  //         100: "#009E60",
  //         foreground: "#EEF5F3",
  //       },
  //       warning: {
  //         DEFAULT: "#FFB040", // WARNING
  //         foreground: "#FBF7F2",
  //       },
  //       muted: {
  //         DEFAULT: "hsl(var(--muted))",
  //         foreground: "hsl(var(--muted-foreground))",
  //       },
  //       accent: {
  //         DEFAULT: "hsl(var(--accent))",
  //         foreground: "hsl(var(--accent-foreground))",
  //       },
  //       popover: {
  //         DEFAULT: "hsl(var(--popover))",
  //         foreground: "hsl(var(--popover-foreground))",
  //       },
  //       card: {
  //         DEFAULT: "hsl(var(--card))",
  //         foreground: "hsl(var(--card-foreground))",
  //       },
  //     },
  //     borderRadius: {
  //       lg: "var(--radius)",
  //       md: "calc(var(--radius) - 2px)",
  //       sm: "calc(var(--radius) - 4px)",
  //     },
  //     keyframes: {
  //       "accordion-down": {
  //         from: { height: "0" },
  //         to: { height: "var(--radix-accordion-content-height)" },
  //       },
  //       "accordion-up": {
  //         from: { height: "var(--radix-accordion-content-height)" },
  //         to: { height: "0" },
  //       },
  //     },
  //     animation: {
  //       "accordion-down": "accordion-down 0.2s ease-out",
  //       "accordion-up": "accordion-up 0.2s ease-out",
  //     },
  //   },
  // },
  plugins: [require("tailwindcss-animate")],
}