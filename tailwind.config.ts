import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#00ff41',
          dim: '#00a82a',
          dark: '#003d0d',
        },
        black: '#000000',
        amber: '#ffb000',
        'hacker-red': '#ff2244',
        cyan: '#00ffff',
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', 'monospace'],
        vt: ['"VT323"', 'monospace'],
        orbitron: ['"Orbitron"', 'monospace'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'blink-slow': 'blink 1.5s infinite',
        scandown: 'scandown 8s linear infinite',
        'glitch-name': 'glitchName 5s infinite',
        'typing-dot': 'typingDot 1s infinite',
        'float-up': 'floatUp 0.8s ease-out forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scandown: {
          from: { top: '-5%' },
          to: { top: '105%' },
        },
        glitchName: {
          '0%, 90%, 100%': { opacity: '0' },
          '92%': { opacity: '0.7', transform: 'translateX(-4px)' },
          '94%': { opacity: '0', transform: 'translateX(4px)' },
          '96%': { opacity: '0.5', transform: 'translateX(-2px)' },
          '98%': { opacity: '0' },
        },
        typingDot: {
          '0%, 60%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '30%': { opacity: '1', transform: 'scale(1.2)' },
        },
        floatUp: {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(-60px)' },
        },
      },
      backgroundImage: {
        scanlines:
          'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)',
      },
    },
  },
  plugins: [],
}

export default config
