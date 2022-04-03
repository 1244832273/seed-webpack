/*
 * @Author: 鲁田文
 * @Date: 2022-03-02 18:31:45
 * @LastEditTime: 2022-03-28 16:12:02
 * @LastEditors: 鲁田文
 * @Description: 
 */
// 环境变量配置
process.env.NODE_ENV = 'development';
process.env.SEED_ENV = 'development';

// webpack.dev.js
const { merge } = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.config');

const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

const devConfig = {
  mode: 'development',
  plugins: [
    new ErrorOverlayPlugin()
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    // static允许我们在DevServer下访问该目录的静态资源
    // 简单理解来说 当我们启动DevServer时相当于启动了一个本地服务器
    // 这个服务器会同时以static-directory目录作为跟路径启动
    // 这样的话就可以访问到static/directory下的资源了
    static: {
      directory: path.join(process.cwd(), 'public'),
    },
    // 默认为true
    hot: true,
    // 是否开启代码压缩
    compress: false,
    // 启动的端口
    port: 9000,
  },
};

module.exports = merge(devConfig, baseConfig);
