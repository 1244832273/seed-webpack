/*
 * @Author: 最刚
 * @Date: 2020-07-20 17:49:26
 * @LastEditTime: 2020-07-20 17:50:06
 * @LastEditors: 最刚
 * @Description: SWR默认全局配置
 */

import { ConfigInterface } from 'swr';
const SWRConfigValue: ConfigInterface = {
  suspense: false,
  revalidateOnFocus: false,
  refreshWhenHidden: false,
  loadingTimeout: 10000,
  shouldRetryOnError: false,
  refreshInterval: 0,
};

export default SWRConfigValue;
