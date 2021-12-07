/**
 * @description: dev环境
 * @define: 环境变量配置
 */
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';

export default defineConfig({
  ...defaultSettings,
  define: {
    REACT_NET: 'TESTNET',
    REACT_APP_NODE_1: 'https://bsc-dataseed.binance.org',
  },
});
