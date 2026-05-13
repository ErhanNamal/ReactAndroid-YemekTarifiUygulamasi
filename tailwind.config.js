/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                'ana': '#973c86',
                'yazi': '#fcc103'
            }
        },
    },
    plugins: [],
};
