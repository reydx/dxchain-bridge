import { defineConfig } from 'umi';
import routes from './routes';
import theme from './theme';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  layout: false,
  theme,
  antd: {},
  locale: {
    antd: true,
    default: 'zh-CN',
    baseNavigator: true,
  },
  dva: {
    immer: true,
    hmr: true,
    lazyLoad: true,
  },
  fastRefresh: {},
  favicon: '/favicon.ico',
  dynamicImport: {
    loading: '@/components/Loading',
  },
  request: {
    dataField: '',
  },
  title: 'DxBridge',
});
