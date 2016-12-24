const path = require('path');
const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');
const offlinePlugin = require('offline-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const setting = require('./settings.config.js');

module.exports = {
  devtool: 'source-map',

  entry: [
    require.resolve('./polyfills'),
    './src/web/index'
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'web']
  },

  output: {
    path: setting.appPath,
    filename: 'js/main-[hash].js',
    publicPath: setting.publicPath
  },

  plugins: [
    new copyWebpackPlugin([
            { from: 'static' }
    ]),
    new extractTextPlugin('css/main-[hash].css'),
    new offlinePlugin({
			relativePaths: false,
			updateStrategy: 'all',
			version: '[hash]',
			preferOnline: true,
			safeToUseOptionalCaches: true,
			caches: {
				main: ['/', ':rest:']
      },
			externals: [
        '/',
        'https://fonts.googleapis.com/icon?family=Material+Icons'
			],
			ServiceWorker: {
				navigateFallbackURL: '/',
				events: true
			},
			AppCache: {
				FALLBACK: { '/': '/' }
			}
		}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new htmlWebpackPlugin({
      template: '!!raw!'+ path.join(setting.templatePath, 'index.ejs'),
      inject: 'body',
      filename: 'index.ejs',
      minify: { // Minifying it while it is parsed
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true
      }
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader']
      },
      {
        test: /\.scss/,
        loader: extractTextPlugin.extract("style", "css!sass")
      },
      {
        test: /\.png$/,
        loader: 'file'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'
      },
      { test: /\.css$/, loader: extractTextPlugin.extract('style', 'css') },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  }
};
