/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#F5F7FA', // Cooler off-white to pair with blue
                primary: '#3F7CBF',    // ION Blue
                accent: '#EF534C',     // ION Red
                dark: '#111111',       // High contrast dark
                'ion-green': '#76C691',
                'ion-yellow': '#FFC614',
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                heading: ['"Outfit"', 'sans-serif'],
                drama: ['"Cormorant Garamond"', 'serif'],
                data: ['"IBM Plex Mono"', 'monospace'],
            },
            borderRadius: {
                '2xl': '2rem',
                '3xl': '3rem',
                'full': '9999px',
            }
        },
    },
    plugins: [],
}
