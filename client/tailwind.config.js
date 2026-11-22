/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: '#111315',
        surface: {
          DEFAULT: '#191C1F',
          subtle: '#15171A',
          elevated: '#212529',
          hover: '#282D33',
          active: '#2F353C',
        },
        border: {
          subtle: '#23272B',
          DEFAULT: '#303438',
          hover: '#3E444B',
          focus: '#4E555E',
        },
        content: {
          primary: '#ECEEEF',
          secondary: '#969DA5',
          muted: '#666E77',
          disabled: '#484E55',
        },
        accent: {
          DEFAULT: '#C5F467',
          hover: '#B3E256',
          active: '#A1CE47',
          subtle: 'rgba(197, 244, 103, 0.08)',
          glow: 'rgba(197, 244, 103, 0.18)',
          border: 'rgba(197, 244, 103, 0.35)',
          text: '#0D1108',
        },
        status: {
          error: '#F87171',
          'error-subtle': 'rgba(248, 113, 113, 0.1)',
          'error-border': 'rgba(248, 113, 113, 0.3)',
          success: '#86C98B',
          'success-subtle': 'rgba(134, 201, 139, 0.1)',
          'success-border': 'rgba(134, 201, 139, 0.3)',
          warning: '#EAB308',
          'warning-subtle': 'rgba(234, 179, 8, 0.1)',
          info: '#60A5FA',
          'info-subtle': 'rgba(96, 165, 250, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        xs: '3px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '10px',
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.35)',
        inset: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.04)',
      },
    },
  },
  plugins: [],
}
