/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lingua-dark': '#0a0a0f',
        'lingua-darker': '#06060a',
        'lingua-surface': '#111118',
        'lingua-card': '#1a1a24',
        'lingua-border': '#2a2a3a',
        'lingua-blue': '#4f6ef7',
        'lingua-blue-dark': '#3d5ce0',
        'lingua-blue-light': '#6b84ff',
        'lingua-purple': '#7c3aed',
        'lingua-accent': '#00d4ff',
        'lingua-muted': '#8888aa',
        'lingua-text': '#e8e8f0',
        'lingua-subtext': '#9999bb',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79, 110, 247, 0.15), transparent)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
