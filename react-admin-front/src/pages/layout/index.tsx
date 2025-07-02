import { Layout } from 'antd';
import AppHeader from './header';
import AppSider from './sider';
import { Outlet } from 'react-router';

const { Content } = Layout;

export default function AppLayout() {
  return (
    <>
      <Layout className="size-full">
        <AppSider></AppSider>
        <Layout>
          <AppHeader></AppHeader>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
