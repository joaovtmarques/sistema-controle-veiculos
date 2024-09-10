/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./pages/js,jsx,ts,tsx}',
		'./src/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		fontFamily: {
			open: ['Open Sans', 'Arial', 'Helvetica', 'sans-serif'],
		},
		extend: {},
		colors: {
			green1: '#0E7321',
			green2: '#00420C',
			black: '#333333',
			white: '#FFFFFF',
			gray1: '#F4F4F4',
			gray2: '#CCCCCC',
			gray3: '#ADADAD',
			red: '#FF5656',
		},
	},
	plugins: [],
};
