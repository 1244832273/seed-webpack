/*
 * @Author: 鲁田文
 * @Date: 2022-03-02 18:31:45
 * @LastEditTime: 2022-03-29 15:09:31
 * @LastEditors: 鲁田文
 * @Description: 
 */
// 环境变量配置
process.env.SEED_ENV = 'production';

// webpack.prod.js
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config');

const devConfig = {
  mode: 'production',
  output: {
    clean: true, // 在生成文件之前清空 output 目录
    filename: '[name].[contenthash].js', // 输出文件名
    path: path.join(process.cwd(), 'dist') // 输出文件目录
  },
};

module.exports = merge(devConfig, baseConfig);
