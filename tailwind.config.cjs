/** @type {import('tailwindcss').Config}*/
const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	
	plugins: [],
	
	darkMode: "class",
	theme: {
		extend: {
			boxShadow: {
				"primary-light": "0px 0px 20px 5px rgba(255, 217, 204, 0.5)",
				"primary-dark": "0px 0px 20px 5px rgba(184, 57, 15, 0.5)",
			},
			colors: {
				"accent-dark": "#fa9e7f",
				"border-dark": "#52372f",
				"background-dark": "#1c130f",
				"foreground-dark": "#1c130f",
				"unfocused-dark": "#a18378",
				"disabled-dark": "#856459",
				"secondary-dark": "#bfaaa3",

				"accent-light": "#d48368",
				"border-light": "#ccb5ad",
				"background-light": "#f0e7e4",
				"foreground-light": "#40312d",
				"unfocused-light": "#87695f",
				"disabled-light": "#ccada3",
				"secondary-light": "#5c4740",
			}
		},
	},
};

module.exports = config;
