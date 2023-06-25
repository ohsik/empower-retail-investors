const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production', // or 'development'
  entry: {
    bundle: path.resolve(__dirname, './src/app.tsx'),
    popup: path.resolve(__dirname, './src/popup/popup.tsx'),
    content: './src/chrome-services/content.ts',
    background: './src/chrome-services/background.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: ({ chunk }) => {
      if (chunk.name === 'bundle' || chunk.name === 'popup') {
        return 'static/js/bundle.[contenthash].js';
      }
      return 'static/js/[name].js';
    },
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[name][ext]',
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/popup/popup.html',
      filename: 'popup.html',
      chunks: ['popup'],
      inject: 'body',
      minify: true,
      hash: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/app.html',
      filename: 'app.html',
      chunks: ['bundle'],
      inject: 'body',
      minify: true,
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/bundle.css',
      chunkFilename: 'static/css/[id].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: "public" },
      ],
    }),
    // new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        }
      }
    }
  }
};