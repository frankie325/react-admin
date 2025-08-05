import { createBrowserRouter } from 'react-router';
import Layout from '@/pages/layout/index.tsx';
import Home from '@/pages/home/index.tsx';
import Login from '@/pages/login/index.tsx';
import UserPage from '@/pages/user/index.tsx';
import Examples from '@/examples/index.tsx';

// 静态路由
export const  staticRoutes = [
  {
    path: '/',
    Component: Layout,
    children: [{ index: true, Component: Home }],
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/userPage',
    Component: Layout,
    children: [{ index: true, Component: UserPage }],
  },
  // {
  //   path: '/examples',
  //   Component: Examples,
  //   children: [],
  // },
];

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [{ index: true, Component: Home }],
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/examples',
    Component: Examples,
    children: [],
  },
]);

export default router;
