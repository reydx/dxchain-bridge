export default [
  {
    path: '/',
    component: '@/components/Layout',
    routes: [
      {
        path: '/login',
        component: '@/pages/login',
        name: 'menu.login'
      }
    ],
  },
];
