const process = require('process');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const resolve = require('./webpack/resolve');

var SERVER_ENV = process.env.SERVER_ENV || 'development';

const modPath = (p) => {
  return path.resolve(`./node_modules/${p}`);
};

const aliases = resolve.resolveAliases(path.resolve('./src'), {
  // External dependencies
  '@store': path.join(__dirname, '../mobile/src/store'),
  '@utils': path.join(__dirname, '../mobile/src/helpers'),
  '@config': path.join(__dirname, '../mobile/src/config'),
});

module.exports = {
  devtool: '#source-map',
  node: true,
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    path.join(__dirname, './src/index'),
  ],
  resolve: {
    root: path.resolve('./'),
    moduleDirectories: ['src', 'node_modules'],
    fallback: path.resolve('./node_modules/'),
    alias: aliases,
    extensions: ['', '.js', '.jsx'],
  },
  resolveLoader: {
    alias: aliases,
    fallback: path.resolve('./node_modules/')
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: '/static/app/',
    devtoolLineToLine: true,
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'babel-preset-es2015',
            'babel-preset-react',
          ].map(modPath),
          babelrc: false,
          plugins: [
            modPath('babel-plugin-transform-export-extensions'),
            modPath('babel-plugin-transform-object-rest-spread'),
            modPath('babel-plugin-transform-es2015-destructuring'),
          ],
        },
      },
      {
        test: /\.(jpg|png|gif|svg|otf|ttf|woff|woff2|eot)($|\?)/,
        loader: 'file-loader?name=[name].[hash].[ext]&publicPath=/static/app/assets/&outputPath=assets/',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap'),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!less?sourceMap'),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap'),
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'env.configFilename': '"@config/config.' + SERVER_ENV + '"',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('bundle.css', {allChunks: true}),
  ],
};
