const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
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
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: './src',
    watchContentBase: true,
    host: 'localhost',
    port: 8000,
    hot: true,
  },
  mode: 'development',
}