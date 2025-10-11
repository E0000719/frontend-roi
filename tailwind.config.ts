import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
		green: {
			50: '#E8FDF1',
			100: '#B6F8D4',
			200: '#93F5BF',
			300: '#62F1A1',
			400: '#43EE8F',
			500: '#14EA73',
			600: '#12D569',
			700: '#0EA652',
			800: '#0B813F',
			900: '#086230'
		},
		'bluegrey': {
			50: '#F6F8F9',
			100: '#E4EBEE',
			200: '#D7E1E5',
			300: '#C4D3D9',
			400: '#B9CAD2',
			500: '#A7BDC7',
			600: '#98ACB5',
			700: '#77868D',
			800: '#5C686D',
			900: '#464F54'
		},
		blue: {
			50: '#F0FCFE',
			100: '#D0F7FB',
			200: '#B9F3F9',
			300: '#98EDF6',
			400: '#85E9F5',
			500: '#66E4F2',
			600: '#5DCFDC',
			700: '#48A2AC',
			800: '#387D85',
			900: '#2B6066'
		},
		gray: {
			50: '#FAFAFA',
			100: '#F5F5F5',
			200: '#E9EAEB',
			300: '#D5D7DA',
			400: '#A4A7AE',
			500: '#717680',
			600: '#535862',
			700: '#414651',
			800: '#252837',
			900: '#181D27'
		},
		info: {
			50: '#F1F7FE',
			100: '#E3EDFB',
			200: '#C0DAF7',
			300: '#88BDF1',
			400: '#499BE7',
			500: '#2584DD',
			600: '#1362B6',
			700: '#114E93',
			800: '#12447A',
			900: '#153A65'
		},
		error: {
			50: '#FFEAEB',
			100: '#FFBDBD',
			200: '#FF9D9D',
			300: '#FF7070',
			400: '#FF5454',
			500: '#FF2929',
			600: '#E82525',
			700: '#B51D1D',
			800: '#8C1717',
			900: '#6B1111'
		},
		pink: {
			50: '#FFFAFA',
			100: '#FEF0F0',
			200: '#FDE8E8',
			300: '#FCDEDE',
			400: '#FCD7D7',
			500: '#FBCDCD',
			600: '#E4BBBB',
			700: '#B29292',
			800: '#8A7171',
			900: '#695656'
		},
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
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
		success: {
			DEFAULT: 'hsl(var(--success))',
			foreground: 'hsl(var(--success-foreground))',
			50: '#F7FFF8',
			100: '#E5FEEB',
			200: '#DBFEE1',
			300: '#C7FED3',
			400: '#BCFDCA',
			500: '#ABFDBD',
			600: '#9CE6AC',
			700: '#79B486',
			800: '#5E8B68',
			900: '#486A4F'
		},
		warning: {
			DEFAULT: 'hsl(var(--warning))',
			foreground: 'hsl(var(--warning-foreground))',
			50: '#FFFCF5',
			100: '#FFF5E1',
			200: '#FFF1D3',
			300: '#FEEABF',
			400: '#FEE6B2',
			500: '#FEE09F',
			600: '#E7CC91',
			700: '#B49F71',
			800: '#8C7B57',
			900: '#6B5E43'
		},
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
			neue: ['"Neue Haas Grotesk"', 'system-ui', 'sans-serif'],
			jetbrains: ['"JetBrains Mono"', 'monospace']
	  },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
