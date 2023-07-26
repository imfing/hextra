let tailwindConfig = process.env.HUGO_FILE_TAILWIND_CONFIG_JS || './tailwind.config.js';
const tailwind = require('tailwindcss')(tailwindConfig);
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested')

module.exports = {
	plugins: [tailwind, nested, ...(process.env.HUGO_ENVIRONMENT === 'production' ? [autoprefixer] : [])], // add nesting to the plugins array
};
