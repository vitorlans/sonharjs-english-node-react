const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

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
    path: path.join(__dirname, 'public'),
    filename: 'js/all.js',
    publicPath: '/'
  },

  plugins: [
    new ExtractTextPlugin('css/main.css'),
    new OfflinePlugin({
      excludes: ["images/*.png"],
      ServiceWorker: { events: true }
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
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel-loader?presets=latest'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader?presets=latest']
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract("style", "css!sass")
      },
      {
        test: /\.png$/,
        loader: 'file'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  }
};
