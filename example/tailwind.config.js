/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#646cff',
        secondary: '#747dff',
        dark: '#1a1a1a',
        'dark-darker': '#141414',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgba(255, 255, 255, 0.87)',
            a: {
              color: '#646cff',
              '&:hover': {
                color: '#747dff',
              },
            },
            h1: {
              color: '#646cff',
            },
            h2: {
              color: '#646cff',
            },
            h3: {
              color: '#646cff',
            },
            h4: {
              color: '#646cff',
            },
            code: {
              color: 'white',
              background: '#1a1a1a',
            },
            blockquote: {
              borderLeftColor: '#646cff',
              color: '#888',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
} 