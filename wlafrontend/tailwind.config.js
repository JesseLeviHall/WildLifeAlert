/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./App.{js,jsx,ts,tsx}',
		'./screens/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
		'./node_modules/react-native-elements/src/index.js',
		'./node_modules/react-native-elements/src/index.d.js',
		'./node_modules/react-native-elements/src/index.ts',
		'./node_modules/react-native-elements/src/index.tsx',
		'./node_modules/react-native-elements/src/index.d.ts',
	],
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
};
