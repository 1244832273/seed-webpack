/*
 * @Author: 鲁田文
 * @Date: 2021-05-18 16:27:42
 * @LastEditTime: 2021-05-24 16:25:54
 * @LastEditors: 鲁田文
 * @Description: 限制整数输入
 */

import React from 'react';
import { InputNumber as AntdInputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';
import styles from './index.module.styl';

interface MyInputNumber extends InputNumberProps {
  width?: number | string;
  showActionBtn?: boolean; // 是否展示数值输入框加减按钮
}

function InputNumber({ showActionBtn = false, width, ...props }: MyInputNumber) {
  return (
    <AntdInputNumber
      className={showActionBtn ? styles.showActionBtn : ''}
      style={{ width: width }}
      maxLength={20}
      max={99999999999999999999}
      {...props}
      formatter={(value) =>
        `${
          typeof value === 'string' && value && value !== '-' && /^[\+\-]?\d*?\.?\d*?$/.test(`${value}`)
            ? parseInt(value)
            : value
        }`
      }
    />
  );
}

export default InputNumber;
