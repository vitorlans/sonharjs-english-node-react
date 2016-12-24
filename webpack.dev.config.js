const path = require('path');
const webpack = require('webpack');
const setting = require('./settings.config.js'); 
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'eval',

  entry: [
    require.resolve('./polyfills'),
    'webpack-hot-middleware/client',
    './src/web/index'
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'web']
  },

  output: {
    path: setting.appPath,
    filename: 'js/main.js',
    publicPath: setting.publicPath
  },

  plugins: [
    new copyWebpackPlugin([
            { from: 'static' }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel-loader']
      },
      {
        test: /\.scss/,
        loader: "style-loader!css-loader!sass-loader"
       },
      {
        test: /\.png$/,
        loader: 'file'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  }
};
