// tailwind.config.js
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
                black: '#000000',
                'dark-purple': '#2d2d40',
                'gray': {
                    900: '#121212',
                    800: '#1a1a1a',
                    700: '#2e2e2e',
                    600: '#333333',
                    200: '#aaaaaa',
                },
                'accent': {
                    teal: '#0089bb',
                    blue: '#4897C3',
                    'dark-teal': '#006E8A',
                    aqua: '#00D8D8',
                    pink: '#FF0092',
                },
                white: '#ffffff',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #00BB8F 0%, #4897C3 40%, #FF0092 75%)',
                'gradient-secondary': 'linear-gradient(135deg, #006E8A 0%, #00D8D8 100%)',
                'gradient-blue': 'linear-gradient(135deg, #006E8A 0%, #4897C3 100%)',
                'gradient-teal': 'linear-gradient(135deg, #006E8A 0%, #00BB8F 100%)',
            },
            boxShadow: {
                'glow-teal': '0 0 20px rgba(0, 187, 143, 0.3)',
                'glow-blue': '0 0 20px rgba(72, 151, 195, 0.3)',
                'glow-aqua': '0 0 20px rgba(0, 216, 216, 0.3)',
            },
            spacing: {
                'xs': '5px',
                'sm': '10px',
                'md': '20px',
                'lg': '30px',
                'xl': '40px',
            },
            borderRadius: {
                DEFAULT: '4px',
                'button': '4px',
                'xl': '1em',
                '2xl': '1em',
            },
            animation: {
                'gradient-x': 'gradient-x 15s ease infinite',
                'gradient-y': 'gradient-y 15s ease infinite',
                'gradient-xy': 'gradient-xy 15s ease infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                'gradient-x': {
                    '0%, 100%': {
                        'background-position': '0% 50%',
                        'background-size': '200% 200%',
                    },
                    '50%': {
                        'background-position': '100% 50%',
                        'background-size': '200% 200%',
                    },
                },
                'gradient-y': {
                    '0%, 100%': {
                        'background-position': '50% 0%',
                        'background-size': '200% 200%',
                    },
                    '50%': {
                        'background-position': '50% 100%',
                        'background-size': '200% 200%',
                    },
                },
                'gradient-xy': {
                    '0%, 100%': {
                        'background-position': '0% 0%',
                        'background-size': '200% 200%',
                    },
                    '50%': {
                        'background-position': '100% 100%',
                        'background-size': '200% 200%',
                    },
                },
                'float': {
                    '0%, 100%': {
                        transform: 'translateY(0)',
                    },
                    '50%': {
                        transform: 'translateY(-10px)',
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}