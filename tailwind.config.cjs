const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
    extend: {
      colors: {
        'red-neg': '#fc0000',
        'green-pos':'#25cf2e'
      },
    }
  },

	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};

module.exports = config;
