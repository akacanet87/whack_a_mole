const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/scripts/index.ts',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /[.js]$/,
        exclude: /node_module/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_module/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      // path.join(__dirname, 'src'),
      'node_modules',
    ],
    extensions: [
      '.ts',
      '.js',
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/index.html',
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 8000,
  },
  mode: 'development',
}