const path = require('path');
const config = require('config');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const extractRoot = new MiniCssExtractPlugin({
	filename: 'css/admin.css',
});
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MODE = 'development';

module.exports = {
	mode: MODE,
	devtool: 'source-map',
	optimization: {
		runtimeChunk: true,
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
			},
			{
				test: /.(tsx|ts)$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/typescript', '@babel/preset-env'],
						},
					},
					{ loader: 'ts-loader' },
				],
			},
			// {
			// 	test: /\.tsx?$/,
			// 	use: 'ts-loader',
			// 	exclude: /node_modules/,
			// },
			{
				test: /\.css$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',

					},
				],
			},
			{
				test: /\.styl$/,
				exclude: [
					/(node_modules|bower_components)/,
				],
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'stylus-loader',
					},
				],
			},
			{
				test: /\.pug$/,
				use: ['pug-loader'],
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			},
			{
				test: /\.(png|jpg|gif|ttf|eot|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						},
					},
				],
			},
		],
	},
	devServer: {
		port: config.WEBPACK.PORT,
		contentBase: 'public',
		historyApiFallback: {
			rewrites: [
				{ from: /^\/portal/, to: '/portal-app.html' },
			],
		},
	},
	entry: {
		'portal-console': path.join(__dirname, 'app', 'portal-console', 'index.tsx'),
	},
	output: {
		path: path.join(__dirname, './public'),
		filename: 'js/[name].js',
		publicPath: '/',
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				MODE: JSON.stringify(config.MODE),
				SVTP_BASE_API_URL: JSON.stringify(config.SVTP.BASE_API_URL),
			},
		}),
		extractRoot,
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new HtmlWebpackPlugin({
			filename: 'portal-app.html',
			chunks: ['portal-console'],
			template: 'views/portal-app.pug',
			favicon: 'images/favicon.ico',
		}),
	],
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
		alias: {
			'portal-console': path.join(__dirname, './app/portal-console/'),
			immutable: path.join(__dirname, './node_modules/immutable'),
		},
	},
};
