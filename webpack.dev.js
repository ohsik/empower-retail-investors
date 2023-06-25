const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const path = require('path');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
  },
})