const path = require('path');

module.exports = {
	plugins: [
		require('tailwindcss')(path.resolve('tailwind.js')),
		require('autoprefixer')(),
	],
};
