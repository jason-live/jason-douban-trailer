import AC from './component/async_load';

export default [
  {
    name: '首页',
    icon: 'home',
    path: '/',
    component: AC(() => import('./view/home'))
  },
  {
    name: '详情页',
    path: '/detail/:id',
    component: AC(() => import('./view/movie/detail'))
  }
];