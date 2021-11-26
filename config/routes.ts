export default [
  {
    path: '/',
    component: '@/components/Layout',
    // wrappers: ['@/wrappers/auth'],
    routes: [
      {
        path: '/login',
        component: '@/pages/login',
        name: 'menu.login',
      },
      {
        path: '/',
        component: '@/pages/transfer',
        name: 'menu.transfer',
      },
      {
        path: '/select',
        component: '@/pages/select',
        name: 'menu.select',
      },
      {
        path: '/convert',
        component: '@/pages/convert',
        name: 'menu.convert',
      },
      {
        path: '/confirm',
        component: '@/pages/confirm',
        name: 'menu.confirm',
      },
      {
        path: '/wrapping',
        component: '@/pages/wrapping',
        name: 'menu.wrapping',
      },
      {
        path: '/transaction',
        component: '@/pages/transaction',
        name: 'menu.transaction',
      },
      {
        path: '/proof',
        component: '@/pages/proof',
        name: 'menu.proof',
      },
    ],
  },
];
