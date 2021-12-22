/**
 * @description: prod环境
 * @define: 环境变量配置
 */
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';

export default defineConfig({
  ...defaultSettings,
  define: {
    REACT_NET: 'MAINNET',
    FETCH_URLS: [
      'https://alpha-dxchain-bridge.s3.ap-southeast-1.amazonaws.com/bridge_settings_1.json',
      'https://alpha-dxchain-bridge.s3.ap-southeast-1.amazonaws.com/bridge_settings_1.json',
      'https://alpha-dxchain-bridge.s3.ap-southeast-1.amazonaws.com/bridge_settings_1.json',
    ],
    REACT_APP_NODE_1: 'https://bsc-dataseed.binance.org',
  },
});
