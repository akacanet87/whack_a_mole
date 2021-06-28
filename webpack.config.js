const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
  entry: [
    '@babel/polyfill',
    './src/app.ts',
    './src/router/index.ts',
    './src/assets/styles/common.scss',
  ],
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
          options: {
            presets: ['@babel/preset-env'],
          },
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
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        exclude: /fonts/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/assets/images',
            },
          },
        ],
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        exclude: /images/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/assets/fonts',
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
      '.css',
      '.scss',
      '.json',
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: './src',
    watchContentBase: true,
    host: 'localhost',
    port: 8000,
    hot: true,
    historyApiFallback: true,
  },
  mode: 'development',
}