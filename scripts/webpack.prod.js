/*
 * @Author: 鲁田文
 * @Date: 2022-03-02 18:31:45
 * @LastEditTime: 2022-03-24 18:55:15
 * @LastEditors: 鲁田文
 * @Description: 
 */
// 环境变量配置
process.env.SEED_ENV = 'production';

// webpack.prod.js
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config');
const path = require('path');

const devConfig = {
  mode: 'production',
};

module.exports = merge(devConfig, baseConfig);
