const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require("dotenv-webpack")

module.exports = { // change to 'production' for deploy
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
        patterns: [
          { from: 'src/', to: '' }, // This copies assets from `src/assets/` to `dist/assets/`
        ],
      }),
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  mode: 'development',
};
