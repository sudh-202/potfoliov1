/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['var(--font-inter)'],
        'space-grotesk': ['var(--font-space-grotesk)'],
        'sora': ['var(--font-sora)'],
      },
      keyframes: {
        scroll: {
          "0%": { opacity: "0" },
          "10%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(15px)", opacity: "0" },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        squish: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05, 0.95)' },
        },
        rotate: {
          'from': { transform: 'rotate(360deg)' },
        },
        look: {
          '0%, 100%': { transform: 'translateX(0)' },
          '30%': { transform: 'translateX(-0.3vw)' },
          '70%': { transform: 'translateX(0.3vw)' },
        },
        blink: {
          '0%, 48%, 52%, 100%': { transform: 'translateY(-1.2vw)' },
          '50%': { transform: 'translateY(0)' },
        },
        smile: {
          '0%, 100%': { transform: 'translateX(-50%) scale(1)' },
          '50%': { transform: 'translateX(-50%) scale(1.1, 0.9)' },
        },
        shine: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.5' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(-50%) scaleX(1)' },
          '50%': { transform: 'translateX(-50%) scaleX(1.2)' },
        },
        'spin-horizontal': {
          'from': { transform: 'rotateY(0deg)' },
          'to': { transform: 'rotateY(360deg)' }
        },
        'border-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'border-flow': {
          '0%, 100%': { 
            backgroundPosition: '0% 50%',
            backgroundSize: '200% 200%'
          },
          '50%': { 
            backgroundPosition: '100% 50%',
            backgroundSize: '200% 200%'
          }
        },
        'ball-load': {
          '0%': { 
            transform: 'translate(-50%, -100%) scale(0.8)',
            opacity: '0'
          },
          '50%': {
            transform: 'translate(-50%, -75%) scale(1.1)',
            opacity: '1'
          },
          '75%': {
            transform: 'translate(-50%, -75%) scale(0.95)',
          },
          '100%': {
            transform: 'translate(-50%, -75%) scale(1)',
          }
        },
        'drop-in': {
          '0%': { 
            transform: 'translate(-50%, -200%)',
          },
          '100%': {
            transform: 'translate(-50%, -75%)',
          }
        },
        'pulse-scale': {
          '0%, 100%': { 
            transform: 'translate(-50%, -75%) scale(1)',
          },
          '50%': {
            transform: 'translate(-50%, -75%) scale(1.05)',
          }
        },
        'cursor-ping': {
          '0%': {
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'translate(-50%, -50%) scale(2)',
            opacity: '0'
          }
        },
        'star-1': {
          '0%': { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translate(-20px, -20px) scale(1.5) rotate(45deg)', opacity: '0' }
        },
        'star-2': {
          '0%': { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translate(20px, -20px) scale(1.5) rotate(-45deg)', opacity: '0' }
        },
        'star-3': {
          '0%': { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translate(-20px, 20px) scale(1.5) rotate(-45deg)', opacity: '0' }
        },
        'star-4': {
          '0%': { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translate(20px, 20px) scale(1.5) rotate(45deg)', opacity: '0' }
        },
        'star-center': {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.5) rotate(180deg)', opacity: '1' },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' }
        },
        'scroll-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' }
        },
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        squish: 'squish 3s ease-in-out infinite',
        scroll: "scroll 2.2s cubic-bezier(.15,.41,.69,.94) infinite",
        rotate: 'rotate 8s linear infinite reverse',
        look: 'look 4s infinite',
        blink: 'blink 4s infinite',
        smile: 'smile 4s ease-in-out infinite',
        shine: 'shine 4s infinite',
        wave: 'wave 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'spin-horizontal': 'spin-horizontal 8s linear infinite',
        'border-rotate': 'border-rotate 8s linear infinite',
        'border-flow': 'border-flow 8s ease infinite',
        'ball-load': 'ball-load 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'drop-in': 'drop-in 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'pulse-scale': 'pulse-scale 3s ease-in-out infinite',
        'cursor-ping': 'cursor-ping 0.5s cubic-bezier(0, 0, 0.2, 1)',
        'star-1': 'star-1 0.7s ease-out forwards',
        'star-2': 'star-2 0.7s ease-out forwards',
        'star-3': 'star-3 0.7s ease-out forwards',
        'star-4': 'star-4 0.7s ease-out forwards',
        'star-center': 'star-center 0.7s ease-out forwards',
        'scroll-bounce': 'scroll-bounce 2s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
