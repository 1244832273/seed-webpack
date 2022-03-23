/*
 * @Author: 鲁田文
 * @Date: 2022-03-02 11:43:47
 * @LastEditTime: 2022-03-23 18:36:39
 * @LastEditors: 鲁田文
 * @Description:
 */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 自动清空打包目录

module.exports = {
  entry: {
    main: path.resolve(process.cwd(), 'src/main.tsx'),
  },
  output: {
    filename: '[name].[contenthash].js', // 输出文件名
    path: path.join(process.cwd(), 'dist') // 输出文件目录
  },
  resolve: {
    alias: {
      Src: path.resolve(process.cwd(), 'src'),
      Pages: path.resolve(process.cwd(), 'src/pages'),
      Assets: path.resolve(process.cwd(), 'src/assets'),
    },
    mainFiles: ['index', 'main'], // 解析目录时要使用的文件名
    extensions: ['.ts', '.tsx', '.scss', 'json', '.js'], // 配置文件不带后缀名 解析顺序
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
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
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
    new CleanWebpackPlugin(),
  ],
};
