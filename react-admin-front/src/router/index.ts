import { createBrowserRouter } from 'react-router';
import Layout from '@/pages/layout/index.tsx';
import Home from '@/pages/home/index.tsx';
import Login from '@/pages/login/index.tsx';
import Examples from '@/examples/index.tsx';
import UserPage from '@/pages/system/user/index.tsx';
import RolePage from '@/pages/system/role/index.tsx';
import MenuPage from '@/pages/system/menu/index.tsx';

// 静态路由
export const staticRoutes = [
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
    path: '/system/userPage',
    Component: Layout,
    children: [{ index: true, Component: UserPage }],
  },
  {
    path: '/system/rolePage',
    Component: Layout,
    children: [{ index: true, Component: RolePage }],
  },
  {
    path: '/system/menuPage',
    Component: Layout,
    children: [{ index: true, Component: MenuPage }],
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
