/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
   theme: {
    extend: {
      keyframes: {
        'chat-in': { '0%': { transform: 'scale(0.8)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        'message-pop': { '0%': { transform: 'scale(0.9)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        'bounce-dot': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-3px)' } }
      },
      animation: {
        'chat-in': 'chat-in 0.3s ease-out forwards',
        'message-pop': 'message-pop 0.15s ease-out forwards',
        'bounce-dot': 'bounce-dot 0.6s infinite ease-in-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
}
