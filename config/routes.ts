export default [
  {
    path: '/',
    component: '@/components/Layout',
    wrappers: ['@/wrappers/auth', '@/wrappers/wallet'],
    routes: [
      {
        path: '/login',
        component: '@/pages/login',
        name: 'menu.login'
      }
    ],
  },
];
