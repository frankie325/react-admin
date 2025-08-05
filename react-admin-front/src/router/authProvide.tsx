import { BrowserRouter, Navigate, useRoutes } from 'react-router';
import { staticRoutes } from '@/router';
import store from '@/store';
import { selectAccessToken } from '@/store/user';

const AuthRouter = () => {
  // const routes = [];

  // 1。登录后获取所有路由表，使用 useRoutes 进行路由匹配
  const element = useRoutes(staticRoutes);
  console.log('🚀 ~ AuthRouter ~ element:', element);

  // 2. 判断该路由需不需要权限
  // const accessToken = selectAccessToken(store.getState());

  // 3. 如果需要权限且没有登录，则重定向到登录页
  // if (!accessToken) {
  //   return <Navigate to="/login" replace />;
  // }

  // 2。返回匹配的路由
  // return element;
  return element;
};

export default function AuthProvider() {
  return (
    <BrowserRouter>
      <AuthRouter></AuthRouter>
    </BrowserRouter>
  );
}
