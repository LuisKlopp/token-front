const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const resolve = require('./webpack.config.resolve');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
require('dotenv').config({ silent: true });

module.exports = () => {
  return {
    entry: ['./src/index.tsx'],
    mode: process.env.NODE_ENV || 'development',
    resolve,
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: { transpileOnly: true },
        },
        {
          test: /\.css?$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new EnvironmentPlugin({
        API_ENDPOINT: process.env.API_ENDPOINT,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        favicon: 'src/aseets/favicon/favicon3.ico',
      }),
      new TsconfigPathsPlugin({ configFile: 'tsconfig.json' }),
    ],
    devServer: {
      compress: true,
      port: 8081,
      historyApiFallback: true,
    },
  };
};
