const path = require('path');
const glob = require('glob-all');
const PurgecssPlugin = require('purgecss-webpack-plugin');

module.exports = {
	productionSourceMap: false,

	devServer: {
		port: 8000,
	},

	configureWebpack: {
		plugins: [
			new PurgecssPlugin({
				paths: glob.sync([
					path.resolve('public/index.html'),
					path.resolve('src/**/*.vue'),
					path.resolve('src/js/**/*.js'),
				]),
			}),
		],
	},

	chainWebpack(config) {
		// Remove automatic prefetch for all chunks.
		config.plugins.delete('prefetch');

		config.module
			.rule('vue')
			.use('vue-svg-inline-loader')
			.loader('vue-svg-inline-loader');
	},
};
