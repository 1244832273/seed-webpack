'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 自动清空打包目录 webpack5 不需要配置output clean就行
const WebpackBar = require('webpackbar'); // 进度条

const useBuildConfig = process.env.NODE_ENV === 'production';

module.exports = {
  // 在第一个错误出现时抛出失败结果，而不是容忍它。默认情况下，当使用 HMR 时，webpack 会将在终端以及浏览器控制台中，以红色文字记录这些错误，但仍然继续进行打包。
  bail: !useBuildConfig,
  entry: {
    main: path.resolve(process.cwd(), 'src/index.tsx'),
  },
  output: {
    filename: '[name].[contenthash].js', // 输出文件名
    path: path.join(process.cwd(), 'dist') // 输出文件目录
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      Src: path.resolve(process.cwd(), 'src'),
      Pages: path.resolve(process.cwd(), 'src/pages'),
      Assets: path.resolve(process.cwd(), 'src/assets'),
    },
    mainFiles: ['index', 'main'], // 解析目录时要使用的文件名
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.scss', 'json'], // 配置文件不带后缀名 解析顺序
    modules: [
      'node_modules',
      path.resolve(process.cwd(), 'src'),
      path.resolve(process.cwd(), './node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc|le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          // 当解析antd.less，必须写成下面格式，否则会报Inline JavaScript is not enabled错误
          { loader: "less-loader", options: { lessOptions: { javascriptEnabled: true } } },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // asset/resource 将资源分割为单独的文件，并导出 url，类似之前的 file-loader 的功能.
      // asset/inline 将资源导出为 dataUrl 的形式，类似之前的 url-loader 的小于 limit 参数时功能.
      // asset/source 将资源导出为源码（source code）. 类似的 raw-loader 功能.
      // asset 会根据文件大小来选择使用哪种类型，当文件小于 8 KB（默认） 的时候会使用 asset/inline，否则会使用 asset/resource
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset',
        generator: {
          // 输出文件位置以及文件名
          // [ext] 自带 "." 这个与 url-loader 配置不同
          filename: "[name][hash:8][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024 //超过50kb不转 base64
          }
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[chunkhash].css',
    }),
    // 生成html名称为index.html
    // 生成使用的模板为public/index.html
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(process.cwd(), 'public/index.html'),
    }),
    // new CleanWebpackPlugin(),
    new WebpackBar({
      name: useBuildConfig ? '正在打包' : '正在启动',
    }),
  ],
};