export default [
  {
    path: '/',
    component: '@/components/Layout',
    // wrappers: ['@/wrappers/auth'],
    routes: [
      {
        path: '/login',
        component: '@/pages/login',
        name: 'menu.login'
      },
      {
        path: '/',
        component: '@/pages/transfer',
        name: 'menu.transfer'
      },
      {
        path: '/select',
        component: '@/pages/select',
        name: 'menu.select'
      },
      {
        path: '/convert',
        component: '@/pages/convert',
        name: 'menu.convert'
      },
    ],
  },
];
