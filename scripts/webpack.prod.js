/*
 * @Author: 鲁田文
 * @Date: 2022-03-02 18:31:45
 * @LastEditTime: 2022-03-23 18:22:25
 * @LastEditors: 鲁田文
 * @Description: 
 */
// webpack.dev.js
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config');
const path = require('path');

const devConfig = {
  mode: 'production',
  devtool: 'cheap-module-eval-source-map',
};

module.exports = merge(devConfig, baseConfig);
