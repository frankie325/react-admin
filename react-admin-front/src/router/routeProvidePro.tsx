import type React from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router';
import { staticRoutes } from './index';
import Examples from '@/examples/index.tsx';
import { useMemo, useState } from 'react';

//动态权限控制方案一：路由表由后台控制返回，根据路由表的变化，重新生成router实例
const RouteProvidePro: React.FC = function () {
  // 存储在redux的路由表
  const [test, setTest] = useState(1);

  const router = useMemo(() => {
    if (test == 1) {
      return createBrowserRouter(staticRoutes);
    } else {
      return createBrowserRouter([
        {
          path: '/examples',
          Component: Examples,
          children: [],
        },
      ]);
    }
  }, [test]);

//   setTimeout(() => {
//     setTest(2);
//     console.log(222);
//   }, 1000);
  return <RouterProvider router={router}></RouterProvider>;
};
export default RouteProvidePro;
